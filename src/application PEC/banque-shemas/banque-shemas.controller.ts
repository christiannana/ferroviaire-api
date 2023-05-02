import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BanqueShemasService } from './banque-shemas.service';
import { CreateBanqueShemaDto } from './dto/create-banque-shema.dto';
import { UpdateBanqueShemaDto } from './dto/update-banque-shema.dto';

@Controller('banque-shemas')
export class BanqueShemasController {
  constructor(private readonly banqueShemasService: BanqueShemasService) {}

  @Post()
  create(@Body() createBanqueShemaDto: CreateBanqueShemaDto) {
    return this.banqueShemasService.create(createBanqueShemaDto);
  }

  @Get()
  findAll() {
    return this.banqueShemasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.banqueShemasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBanqueShemaDto: UpdateBanqueShemaDto) {
    return this.banqueShemasService.update(+id, updateBanqueShemaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.banqueShemasService.remove(+id);
  }
}
