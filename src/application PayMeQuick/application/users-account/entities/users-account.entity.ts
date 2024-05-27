import mongoose from "mongoose";


export const pay_USER_ACCOUNT = new mongoose.Schema({
    nom: String,
    prenom: String,
    phone: { type: String, index: true },
    codeSecret: String,
    cniRecto: String,
    cniVerso: String,
    cni: String,
    sexe: String,
    type_user: String,
    kyc: {},
    kycVerify: Boolean, 
    phoneVerify: Boolean,
    email:String,
    raisonSocial: String,
    addresse: String,
    code: String,

}, { timestamps: true });


export const pay_OTPCODE = new mongoose.Schema({
    userId: String,
    phone: String,
    OTPcode: String,
}, { timestamps: true });


