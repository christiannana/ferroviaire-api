import { HttpException, Injectable } from '@nestjs/common';

// import { CreateTrameDto, CreateQuestionnaireDto } from './dto/create-formulaire.dto';
import { UpdateQuestionnaireDto, UpdateTrameDto } from './dto/update-formulaire.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateQuestionnaireDto, CreateTrameDto } from './dto/create-formulaire.dto';

@Injectable()
export class FormulaireService {

  constructor(
    @InjectModel('trameGestion') private trameGestion: Model<0>,
    @InjectModel('questionnaireGestion') private questionnaireGestion: Model<0>
    ) {}


  async onCreateTrame(createTrameDto: CreateTrameDto) {
    let trameCreated = await this.trameGestion.create(createTrameDto);
    // console.log("opération deroulée avec succès");
    // console.log(JSON.stringify(createFormulaireDto.formulaire));
    return {statut: true , message: "trame de gestion enregistrée avec succès."};
  }

  async onGetAllTrame() {
    var data = await this.trameGestion.find().sort({date: -1}).exec();
    return {"statut": true, "data": data};
  }

  onGetOneTrame(id: string) {
    return `This action returns a #${id} formulaire`;
  }
 
  async onGetCategorieTrame(domaine: any) {
    const data = await this.trameGestion.find().where({ domaine: domaine }).sort({date: -1}).exec();
    return {"statut": true, "data": data};
  }
 

  async onUpdateTrame(_id: string, updateTrameDto: UpdateTrameDto) {
    let modification = await this.trameGestion.findByIdAndUpdate(_id, 
      {formulaire : updateTrameDto.formulaire, titre: updateTrameDto.titre, domaine: updateTrameDto.domaine, date: updateTrameDto.date },
      {upsert:true, new:true}).exec();
    return {"statut": true, "message": "Opération de mise a jout éffectué avec succès."};
  } 

  async onDeleteTrame(_id) {
    await this.trameGestion.findByIdAndDelete(_id);
    return {"statut": true, "message": "Opération de suppression éffectué avec succès."};
  }


  /////////////////////////////    GESTION DES QUESTIONNAIRES  ////////////////////

  
  async onCreateQuestionnaire(createFormulaireDto: CreateQuestionnaireDto) {
    let QuestionnaireCreated = await this.questionnaireGestion.create(createFormulaireDto);
    // console.log("opération deroulée avec succès");
    // console.log(JSON.stringify(createFormulaireDto.formulaire));
    return {statut: true , message: "Questionnaire de gestion enregistrée avec succès."};
  }

  async onGetAllQuestionnaire() {
    var data = await this.questionnaireGestion.find().sort({date: -1}).exec();
    return {"statut": true, "data": data};
  }



  onGetOneQuestionnaire(id) { 
    return `This action returns a #${id} formulaire`;
  }
 

  async onUpdateQuestionnaire(_id, updateQuestionnaireDto: UpdateQuestionnaireDto) {
    let modification = await this.questionnaireGestion.findByIdAndUpdate(_id, 
      {formulaire : updateQuestionnaireDto.formulaire, titre: updateQuestionnaireDto.titre,
         categorieQuestionnaire: updateQuestionnaireDto.categorieQuestionnaire,
         periodicite: updateQuestionnaireDto.periodicite,
         delaisAlerte: updateQuestionnaireDto.delaisAlerte,
         formation: updateQuestionnaireDto.formation,
         habilitation: updateQuestionnaireDto.habilitation,
         date: updateQuestionnaireDto.date },
      {upsert:true, new:true}).exec();
    return {"statut": true, "message": "Opération de mise a jout éffectué avec succès."};
  } 

  async onDeleteQuestionnaire(_id) {
    await this.questionnaireGestion.findByIdAndDelete(_id);
    return {"statut": true, "message": "Opération de suppression éffectué avec succès."};
  }


}





