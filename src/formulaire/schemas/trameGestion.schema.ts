
import * as mongoose from 'mongoose';

export const trameGestion = new mongoose.Schema({
    formulaire: Object,
    typeFormulaire: String,
    domaine: String,
    titre: String,
    date: Date
  });


  export const questionnaireGestion = new mongoose.Schema({
    formulaire: Object,
    typeFormulaire: String,
    categorieQuestionnaire: String,
    typeQuestionnaire: String,
    titre: String,
    periodicite: String,
    delaisAlerte: String,
    formation: String,
    habilitation: String,
    date: Date
  });
  
 