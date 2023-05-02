

import mongoose from 'mongoose';
const { Schema } = mongoose;

export const trame = new mongoose.Schema({
  formulaire: [],
  typeFormulaire: String,
  domaine: String,
  titre: String,
  description: String,
  date: Date,
});

