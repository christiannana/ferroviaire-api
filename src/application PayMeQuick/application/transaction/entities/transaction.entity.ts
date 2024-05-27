
import mongoose from "mongoose";

export class Transaction {}

export const pay_TRANSACTION = new mongoose.Schema({
    trid: String,
    mt_transaction: Number,
    commision: Number,
    mt_total: Number,
    service: String,  // "ORANGE" "MTN"  "PAYMEQUICK"
    serviceCode: String,
    service_phone: String,
    type_transaction: String,  // "CASH_IN" "CASH_OUT"  "PAIEMENT"
    source_compte_id: String,
    destination_compte_id: String, 
    operation_id: String,
    status_transaction: String,  // "PENDING"  "SUCCESS" "ERROR"
    application: String,  //  "PAYMEQUICK" "INFORM_CITY"
    ptn: String,
    description: String,
    call_back_url: String,

}, { timestamps: true });



