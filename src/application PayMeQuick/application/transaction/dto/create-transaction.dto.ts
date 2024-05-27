import { IsNumber } from "class-validator";

export class CreateTransactionDto {
    trid: String;
    codeSecret: String;
    @IsNumber()
    mt_transaction: number;
    commision: Number;
    // mt_total: Number;
    service: String;  // "ORANGE"  "MTN"  "PAYMEQUICK"
    serviceCode: String; 
    service_phone: String;
    type_transaction: String;  // "CASH_IN" "CASH_OUT"
    source_compte_id: String;
    destination_compte_id: String; 
    operation_id: String;
    status_transaction: String = "PENDING";  // "PENDING"  "SUCCESS" "ERRORED"
    application: String;  //  "PAYMEQUICK" "INFORM_CITY"
    description: string;
    call_back_url: string;
}


export class CallBackDTO {
    timestamp: String;
    trid: String;
    statusCode: String;
    status: String;
}





{
    trid: String;
    codeSecret: String;
    mt_transaction: Number;
    service: String; 
    serviceCode: String; 
    service_phone: String;
    type_transaction: String; 
    source_compte_id: String;
    destination_compte_id: String; 
    application: String; 
    description: String;
    call_back_url: String;
}

