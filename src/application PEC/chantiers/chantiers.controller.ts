import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChantiersService } from './chantiers.service';
import { CreateChantierDto, CreateDossierChantierDto } from './dto/create-chantier.dto';
import { UpdateChantierDto } from './dto/update-chantier.dto';

@Controller('chantiers')
export class ChantiersController {
  constructor(private readonly chantiersService: ChantiersService) {}

  @Post()
  create(@Body() createChantierDto: CreateChantierDto) {
    return this.chantiersService.create(createChantierDto);
  }

  @Get()
  findAll() {
    return this.chantiersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chantiersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChantierDto: UpdateChantierDto) {
    return this.chantiersService.update(id, updateChantierDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) { 
    return this.chantiersService.remove(id);
  }

  ///////////////////////////////////  ROUTE POUR LA GESTION DES DOSSIERS ////////////////////////

  @Post("dossier_create")
  onCreateDossier(@Body() createDossierDto: CreateDossierChantierDto){
    return this.chantiersService.onDossierChantierCreate(createDossierDto);
  }

  @Post("dossier_getBy_chantier")
  onGetDossierByChantier(@Body("chantierId") chantierId ){
    return this.chantiersService.onGetAllDossierByChantier(chantierId);
  }

  @Post("dossier_getBy_dossier")
  onGetDossierByDossier(@Body("dossierId") dossierId ){
    return this.chantiersService.onGetAllFichierByDossier(dossierId);
  }

  @Delete('dossier_delete/:id')
  onDeleteDossier(@Param('id') id: string) {
    return this.chantiersService.onDeleteDossier(id);
  }



}


