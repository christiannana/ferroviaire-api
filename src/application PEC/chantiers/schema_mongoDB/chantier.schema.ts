

import * as mongoose from 'mongoose';

export const chantierData = new mongoose.Schema({
  nomChantier: String,
  client: {},
  localisation: String,
  particularite: [],
  responsable: { type: mongoose.Schema.Types.ObjectId, ref: 'personnelData' },
}, { timestamps: true } );


export const dossierChantierData = new mongoose.Schema({
  auteur: { type: mongoose.Schema.Types.ObjectId, ref: 'personnelData' },
  chantierId: { type: mongoose.Schema.Types.ObjectId, ref: 'chantierData' },
  categorie: String,
  nom: String,
  dossierId: String,
  extention: String,
  lienFichier: String,
  taille: String,
}, { timestamps: true } ); 
 
