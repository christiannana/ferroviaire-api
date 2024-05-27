import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InformAllCityService } from './inform-all-city.service';
import { CreateInformAllCityDto } from './dto/create-inform-all-city.dto';
import { UpdateInformAllCityDto } from './dto/update-inform-all-city.dto';

@Controller('inform-all-city')
export class InformAllCityController {
  constructor(private readonly informAllCityService: InformAllCityService) {}

  @Post()
  create(@Body() createInformAllCityDto: CreateInformAllCityDto) {
    return this.informAllCityService.create(createInformAllCityDto);
  }

  @Get()
  findAll() {
    return this.informAllCityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.informAllCityService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInformAllCityDto: UpdateInformAllCityDto) {
    return this.informAllCityService.update(+id, updateInformAllCityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.informAllCityService.remove(+id);
  }
}
