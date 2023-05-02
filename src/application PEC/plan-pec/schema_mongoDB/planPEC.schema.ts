

import * as mongoose from 'mongoose';

export const planPECdata = new mongoose.Schema({
  entrepriseId: String,
  clientId: String,
  chantier: String,
  auteur: { type: mongoose.Schema.Types.ObjectId, ref: 'personnelData' },
  modificateur:  { type: mongoose.Schema.Types.ObjectId, ref: 'personnelData' },
  zoneRaille: String,
  zoneChantier: String,
  tension: String,
  periodeApplicationDebut: String,
  periodeApplicationFin: String,
  imagePlan: String,
  numeroPlanPEC: String, 
  legende: {},
  nbrCV: String, 
  nbrCLR: String,  
  historiqueModification: [],
  ecranInitDX: Number,
  ecranInitDY: Number,
  particulariteLocale: {},
  brouillon: Boolean,
}, {timestamps: true});


export const pdfEnvoyerData = new mongoose.Schema({
  email: String,
  urlPDF: String,  
  auteur: String,
  typePDF: String,
}, {timestamps: true});


