import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PersonnelService } from './personnel.service';
import { CreatePersonnelDto } from './dto/create-personnel.dto';
import { UpdatePersonnelDto } from './dto/update-personnel.dto';

@Controller('personnel')
export class PersonnelController {
  constructor(private readonly personnelService: PersonnelService) {}

  @Post()
  create(@Body() createPersonnelDto: CreatePersonnelDto) {
    return this.personnelService.create(createPersonnelDto);
  }

  @Get()
  findAll() { 
    return this.personnelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personnelService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonnelDto: UpdatePersonnelDto) {
    console.log("yess ca marche NANA")
    return this.personnelService.update(id, updatePersonnelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personnelService.remove(id);
  }


  @Post("connexionAgent")
  async  onConnexionAgnet(@Body('emailProffessionnel') emailProffessionnel: string, @Body('codeAcces') codeAcces: string,) {
    return this.personnelService.onConnexionAgents(emailProffessionnel, codeAcces )

  }
}
