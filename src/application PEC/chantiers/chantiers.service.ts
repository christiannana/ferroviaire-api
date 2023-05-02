import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateChantierDto, CreateDossierChantierDto } from './dto/create-chantier.dto';
import { UpdateChantierDto } from './dto/update-chantier.dto';

@Injectable()
export class ChantiersService {


  constructor(
    @InjectModel('chantierData') private chantierData: Model<0>,
    @InjectModel('dossierChantierData') private dossierChantierData: Model<0>,
  ){}

 async create(createChantierDto: CreateChantierDto) {
    let chantier = await this.chantierData.create(createChantierDto);
    return {statut: true, message: "Chantier enregistré avec succès"};
  }

  async findAll() {
    let datas = await this.chantierData.find().populate("responsable").sort({updatedAt: -1});
    return {statut: true, data: datas};
  }

  findOne(id: string) {
    return `This action returns a #${id} chantier`;
  }

async update(id: string, updateChantierDto: UpdateChantierDto) {
    let action = await this.chantierData.findByIdAndUpdate(id, updateChantierDto)
    return {statut: true, message: "Modification effectué avec succès"};
}

 async remove(id: string) {
    let action = await this.chantierData.findByIdAndDelete(id);
    return {statut: true, message: "Chantier supprimé avec succès"};
  }

  /////////////////////////  FONCTION POUR LA GESTION DES DOSSIER  ///////////////////////////////


  async onDossierChantierCreate(createDossierDto: CreateDossierChantierDto){
      let dossier = await this.dossierChantierData.create(createDossierDto);
      return {statut: true, message: "Dossier créer avec succès sur la plateforme."}
  }

  async onGetAllDossierByChantier(chantierId: String){
    let dossierData = await this.dossierChantierData.find().where({chantierId: chantierId}).sort({updatedAt: -1});;
    return {statut: true, data: dossierData};
  }

  async onGetAllFichierByDossier(dossierId: String){
    let dossierData = await this.dossierChantierData.find().where({dossierId: dossierId}).sort({updatedAt: -1});;
    return {statut: true, data: dossierData};
  }


  async onDeleteDossier(id: String){
    let deleteData = await this.dossierChantierData.findByIdAndDelete(id);
    return {statut: true, message: "Dossier supprimer avec succès."}
  }

}
