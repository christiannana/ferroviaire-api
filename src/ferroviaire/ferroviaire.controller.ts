import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FerroviaireService } from './ferroviaire.service';
import { CreateFerroviaireDto } from './dto/create-ferroviaire.dto';
import { UpdateFerroviaireDto } from './dto/update-ferroviaire.dto';

@Controller('ferroviaire')
export class FerroviaireController {
  constructor(private readonly ferroviaireService: FerroviaireService) {}

  @Post()
  create(@Body() createFerroviaireDto: CreateFerroviaireDto) {
    return this.ferroviaireService.create(createFerroviaireDto);
  }

  @Get()
  findAll() {
    return this.ferroviaireService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ferroviaireService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFerroviaireDto: UpdateFerroviaireDto) {
    return this.ferroviaireService.update(+id, updateFerroviaireDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ferroviaireService.remove(+id);
  }
}
