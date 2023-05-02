
import * as mongoose from 'mongoose';

export const personnelData = new mongoose.Schema({
  nom: String,
  prenom: String,
  dateNaissance: Date,
  adresse: String,
  emailPersonnel: String,
  telephonePersonnel: String,
  fonction: String,
  typeContrat: String,
  dateRecrutement: Date,
  emailProffessionnel: String,
  telephoneProffessionnel: String,
  motPasse: String,
  codeAcces: String,
  droitAcces: String,
  photo: String,
},{ timestamps: true });

