import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HistoriqueConnexionService } from './historique-connexion.service';
import { CreateHistoriqueConnexionDto } from './dto/create-historique-connexion.dto';
import { UpdateHistoriqueConnexionDto } from './dto/update-historique-connexion.dto';

@Controller('historique-connexion')
export class HistoriqueConnexionController {
  constructor(private readonly historiqueConnexionService: HistoriqueConnexionService) {}

  @Post()
  create(@Body() createHistoriqueConnexionDto: CreateHistoriqueConnexionDto) {
    return this.historiqueConnexionService.create(createHistoriqueConnexionDto);
  }

  @Get()
  findAll() {
    return this.historiqueConnexionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historiqueConnexionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHistoriqueConnexionDto: UpdateHistoriqueConnexionDto) {
    return this.historiqueConnexionService.update(+id, updateHistoriqueConnexionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historiqueConnexionService.remove(+id);
  }
}
