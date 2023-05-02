import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LegendesService } from './legendes.service';
import { CreateLegendeDto } from './dto/create-legende.dto';
import { UpdateLegendeDto } from './dto/update-legende.dto';

@Controller('legendes')
export class LegendesController {
  constructor(private readonly legendesService: LegendesService) {}

  @Post()
  create(@Body() createLegendeDto: CreateLegendeDto) {
    return this.legendesService.create(createLegendeDto);
  }

  @Get()
  findAll() {
    return this.legendesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.legendesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLegendeDto: UpdateLegendeDto) {
    return this.legendesService.update(id, updateLegendeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.legendesService.remove(id);
  }
}
