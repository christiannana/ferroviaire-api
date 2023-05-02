

import * as mongoose from 'mongoose';

export const legendeData = new mongoose.Schema({
  titre: String,
  description: String,
  legende: String,
  auteur: String,
  date: {type: Date, default: Date.now() } 
});

