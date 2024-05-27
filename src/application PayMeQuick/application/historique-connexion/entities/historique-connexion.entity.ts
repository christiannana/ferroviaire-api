
import mongoose from "mongoose";
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

export class HistoriqueConnexion {}

export const pay_HISTORIQUE_CONNEXION = new mongoose.Schema({
    userId: { type: MongooseSchema.Types.ObjectId , ref: "pay_PARTICULIER", index: true },
    phone_model: String,
    phone_manufacturer: String,
    phone_serie: String,
    phone_name: String,
}, { timestamps: true });


