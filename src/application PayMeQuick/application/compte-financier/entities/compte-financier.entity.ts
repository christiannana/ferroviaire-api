import mongoose from "mongoose";
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
export class CompteFinancier {}

export const pay_COMPTE_FINANCIER = new mongoose.Schema({
    userId: { type: MongooseSchema.Types.ObjectId , ref: "pay_PARTICULIER", index: true },
    phone: String,
    statusVerify: Boolean,
    solde: Number,
}, { timestamps: true });

