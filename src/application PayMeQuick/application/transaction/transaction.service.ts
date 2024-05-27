import { Injectable } from '@nestjs/common';
import { CallBackDTO, CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { SmsService } from 'src/application PayMeQuick/shared/services/sms/sms.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios from 'axios';
import * as randomatic from 'randomatic';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto'; 

import * as dotenv from 'dotenv';
dotenv.config();


@Injectable()
export class TransactionService {
  base_url: string = "https://s3pv2cm.smobilpay.com/v2/";  //  PRODUCTION
  base_url_callBack: string = "https://inform_city.com/call_back/"
  // base_url: string = "https://s3p.smobilpay.staging.maviance.info/v2";  // TEST

  constructor(
    @InjectModel('pay_TRANSACTION') private TRANSACTION: Model<0>, 
    @InjectModel('pay_COMPTE_FINANCIER') private COMPTE_FINANCIER: Model<0>, 
    private SMS: SmsService
  ) { }

  
  onHeader(paramsUrl: object, bodyData: object, route: string, https_verbe: string ){

    let query = paramsUrl;
    let body = bodyData;
    let input = {...query, ...body}

    let nonce = randomatic('A0', 20);
    let signature_method = "HMAC-SHA1";
    let timestamp = Date.now().toString();
    let token = process.env.PUBLIC_MAVIANCE;
    var secret = process.env.SECRET_MAVIANCE;

    // Authorization: s3pAuth,s3pAuth_nonce="634968823463411609",s3pAuth_signature="V5F+YLj2vQNTfZrmg3OYPFZJ4hw=",s3pAuth_signature_method="HMAC-SHA1",s3pAuth_timestamp="1361281946",s3pAuth_token="xvz1evFS4wEEPTGEFPHBog" 
    // let url = "https://s3p.smobilpay.staging.maviance.info/v2/"+route 

    let url = "https://s3pv2cm.smobilpay.com/v2/" + route
    let auth_titleKey = "s3pAuth";
    let auth_tokenKey = "s3pAuth_token";
    let auth_nonceKey = "s3pAuth_nonce";
    let auth_signatureKey = "s3pAuth_signature";
    let auth_signatureMethodKey = "s3pAuth_signature_method";
    let auth_timestampKey = "s3pAuth_timestamp";
    let separator = ", ";

    let s3pParams = {
        s3pAuth_nonce: nonce,
        s3pAuth_timestamp: timestamp,
        s3pAuth_signature_method: signature_method,
        s3pAuth_token: token
    }
    
    let params = {...input, ...s3pParams};
    Object.keys(params).map(k => params[k] = typeof params[k] == 'string' ? params[k].trim() : params[k]);
    
    let sortedParams = Object.keys(params).sort().reduce((r, k) => (r[k] = params[k], r), {})
    let parameterString = Object.keys(sortedParams).map(key => key + '=' + sortedParams[key]).join('&');
    let baseString = https_verbe + "&" + encodeURIComponent(url) + "&" + encodeURIComponent(parameterString);

    const hmac = crypto.createHmac('sha1', secret);
    hmac.update(baseString);
    const encodedSignature = hmac.digest('base64');
    // let signature =  crypto.createHmac(baseString, secret); //  crypto.AES.encrypt(baseString, secret)  // CryptoJS.HmacSHA1(baseString, secret);
    // let encodedSignature = CryptoJS.enc.Base64.stringify(signature);
    let auth_header =
                auth_titleKey + " " +
                auth_timestampKey + "=\"" + timestamp + "\"" + separator +
                auth_signatureKey + "=\"" + encodedSignature + "\"" + separator +
                auth_nonceKey + "=\"" + nonce + "\"" + separator +
                auth_signatureMethodKey + "=\"" + signature_method + "\"" + separator +
                auth_tokenKey + "=\"" + token + "\"";

    const headers = {
      'Authorization': auth_header, // Replace with your actual token
      'Content-Type': 'application/json', // Optional: Specify content type if needed
    };
    
    return headers;
  }
    

  create(createTransactionDto: CreateTransactionDto) {
    return 'This action adds a new transaction';
  }



   
  async onCreateTransaction(createTransactionDto: CreateTransactionDto) {
    
    // FONCTION QUI GERE LE CASH_OUT
    if(createTransactionDto.serviceCode == "20053" || createTransactionDto.serviceCode == "50053" && createTransactionDto.service != "PAYMEQUICK"  ){
      let cptFinancier: any = await this.COMPTE_FINANCIER.findById(createTransactionDto.destination_compte_id).populate("userId");
      if (!cptFinancier) return { status: false, message: "Désolé, identifiants de compte incorrect." };
      // if (cptFinancier.statusVerify != true) return { status: false, message: "Désolé, ce compte financier n'est pas encore authentifier." };
      let mtCommision = this.onCommissionCalcule(createTransactionDto.mt_transaction, createTransactionDto.type_transaction, createTransactionDto.service);
      let montant_total = createTransactionDto.mt_transaction - mtCommision;
      // if (cptFinancier.solde < montant_total ) return { status: false, message: "Désolé, solde du compte insuffisant pour cette opération." };
     
      if(createTransactionDto.application == "PAYMEQUICK"){
        const match = await bcrypt.compare(createTransactionDto.codeSecret, cptFinancier.userId.codeSecret);
        if (!match) return { status: false, message: "Désolé, identifiants incorrect." };
      }
     
     try{
        const paramsUrl = {
          serviceid: createTransactionDto.serviceCode
        };
        const cashout = await axios.get(this.base_url+"cashout", {"headers": this.onHeader(paramsUrl,{},"cashout", "GET"), "params": paramsUrl } );
        const bodyQuote = {
          "payItemId": cashout.data[0].payItemId,
          "amount": createTransactionDto.mt_transaction
        }
        const quote = await axios.post(this.base_url+"quotestd", bodyQuote, {"headers": this.onHeader({}, bodyQuote, "quotestd", "POST"), });

        let transactionData = await this.TRANSACTION.create(createTransactionDto);
        const bodyCollect = {
          "quoteId": quote.data.quoteId,
          "customerPhonenumber": cptFinancier.userId.phone,
          "customerEmailaddress": "info@paymequick.com",
          "customerName": cptFinancier.userId.nom,
          "customerAddress": "Douale Cameroun",
          "serviceNumber": createTransactionDto.service_phone,
          "trid": transactionData._id
        }
        const collectstd = await axios.post(this.base_url+"collectstd", bodyCollect, {"headers": this.onHeader({}, bodyCollect, "collectstd", "POST"), });
              if(collectstd.data.status == "SUCCESS") {
                let transactionUpdate = await this.TRANSACTION.findByIdAndUpdate(collectstd.data.trid, {status_transaction: "SUCCESS", commision: mtCommision, ptn: collectstd.data.ptn  })
                let newSolde: number =  +(cptFinancier.solde + montant_total).toFixed(2);
                let compteFinUpdate = await this.COMPTE_FINANCIER.findByIdAndUpdate(cptFinancier._id, {solde: newSolde });
              }
        return {status: true, trstatus: collectstd.data.status, message: "Opération en cours d'execution." } ;
      }catch(err){
        return {status: false, error: err, message: "Une Erreur est survenue lors de l'execution." } ;
      }
    }


    // FONCTION QUI GERE LE CASH_IN
    if(createTransactionDto.serviceCode == "90003" || createTransactionDto.serviceCode == "50052" && createTransactionDto.service != "PAYMEQUICK"  ){
      let cptFinancier: any = await this.COMPTE_FINANCIER.findById(createTransactionDto.source_compte_id).populate("userId");
      if (!cptFinancier) return { status: false, message: "Désolé, identifiants de compte incorrect." };
      if (cptFinancier.statusVerify != true) return { status: false, message: "Désolé, ce compte financier n'est pas encore authentifier." };
      let mtCommision = this.onCommissionCalcule(createTransactionDto.mt_transaction, createTransactionDto.type_transaction, createTransactionDto.service);
      let montant_total = createTransactionDto.mt_transaction + mtCommision;
      if (cptFinancier.solde < montant_total ) return { status: false, message: "Désolé, solde du compte insuffisant pour cette opération." };

      if(createTransactionDto.application == "PAYMEQUICK"){
        const match = await bcrypt.compare(createTransactionDto.codeSecret, cptFinancier.userId.codeSecret);
        if (!match) return { status: false, message: "Désolé, identifiants incorrect." };
      }

      try{
        const paramsUrl = {
          serviceid: createTransactionDto.serviceCode
        };
        const cashout = await axios.get(this.base_url+"cashin", {"headers": this.onHeader(paramsUrl,{},"cashin", "GET"), "params": paramsUrl } );
        const bodyQuote = {
          "payItemId": cashout.data[0].payItemId,
          "amount": createTransactionDto.mt_transaction
        }
        const quote = await axios.post(this.base_url+"quotestd", bodyQuote, {"headers": this.onHeader({}, bodyQuote, "quotestd", "POST"), });

        let transactionData = await this.TRANSACTION.create(createTransactionDto);
        const bodyCollect = {
          "quoteId": quote.data.quoteId,
          "customerPhonenumber": cptFinancier.userId.phone,
          "customerEmailaddress": "info@paymequick.com",
          "customerName": cptFinancier.userId.nom,
          "customerAddress": "Douale Cameroun",
          "serviceNumber": createTransactionDto.service_phone,
          "trid": transactionData._id
        }
        const collectstd = await axios.post(this.base_url+"collectstd", bodyCollect, {"headers": this.onHeader({}, bodyCollect, "collectstd", "POST"), });
              if(collectstd.data.status != "ERRORED") {
                let transactionUpdate = await this.TRANSACTION.findByIdAndUpdate(collectstd.data.trid, {status_transaction: collectstd.data.status, commision: mtCommision, ptn: collectstd.data.ptn  });
                let newSolde: number  = +(cptFinancier.solde - montant_total).toFixed(2)
                let compteFinUpdate = await this.COMPTE_FINANCIER.findByIdAndUpdate(cptFinancier._id, {solde: newSolde })  
              }
        return {status: true, trstatus: collectstd.data.status, message: "Opération en cours d'execution." };
      }catch(err){
        return {status: false, error: err, message: "Une Erreur est survenue lors de l'execution." };
      }
    }


    
    // FONCTION QUI GERE LES PAIEMENTS AVEC PAYMEQUICK DEPUIS UNE APPLICATION TIERCE
    if(createTransactionDto.serviceCode == "75001" || createTransactionDto.serviceCode == "75002" && createTransactionDto.service === "PAYMEQUICK"  ){
      let cptFinancierDestinationUser: any = await this.COMPTE_FINANCIER.findById(createTransactionDto.destination_compte_id).populate("userId");
      let cptFinancierSourceUser: any = await this.COMPTE_FINANCIER.findOne().where({ phone: createTransactionDto.service_phone })
      if (!cptFinancierDestinationUser) return { status: false, message: "Désolé, identifiants de compte incorrect." };
      if (!cptFinancierSourceUser) return { status: false, message: "Désolé, Numéro de compte PAYMEQUICK du destinataire incorrect ou non vérifié." };
      // if (cptFinancier.statusVerify != true) return { status: false, message: "Désolé, ce compte financier n'est pas encore authentifier." };
      let mtCommision = this.onCommissionCalcule(createTransactionDto.mt_transaction, createTransactionDto.type_transaction, createTransactionDto.service);
      let montant_total = createTransactionDto.mt_transaction + mtCommision;
       if (cptFinancierSourceUser.solde < montant_total ) return { status: false, message: "Désolé, solde du compte insuffisant pour cette opération." };
       createTransactionDto.status_transaction = "PENDING";
       createTransactionDto.commision = mtCommision;
       let transactionData = await this.TRANSACTION.create(createTransactionDto);
       return {status: true, data: createTransactionDto, message: "Opération en cours d'execution. Allez valider au niveau de l'application mobile PAYMEQUICK" };
    }



    // FONCTION QUI GERE LE PAIEMENT PAYMEQUICK
    if(createTransactionDto.serviceCode == "00000" || createTransactionDto.serviceCode == "00000" && createTransactionDto.service === "PAYMEQUICK"  ){
      let cptFinancierSource: any = await this.COMPTE_FINANCIER.findById(createTransactionDto.source_compte_id).populate("userId");
      let cptFinancierDestination: any = await this.COMPTE_FINANCIER.findById(createTransactionDto.destination_compte_id).populate("userId");
      if (!cptFinancierSource) return { status: false, message: "Désolé, identifiants de compte incorrect." };
      if (!cptFinancierDestination) return { status: false, message: "Désolé, Numéro de compte PAYMEQUICK du destinataire incorrect ou non vérifié." };
      const match = await bcrypt.compare(createTransactionDto.codeSecret, cptFinancierSource.userId.codeSecret);
      if (!match) return { status: false, message: "Désolé, identifiants incorrect." };
      // if (cptFinancier.statusVerify != true) return { status: false, message: "Désolé, ce compte financier n'est pas encore authentifier." };
      
      let mtCommision = this.onCommissionCalcule(createTransactionDto.mt_transaction, createTransactionDto.type_transaction, createTransactionDto.service);
      let montant_total = createTransactionDto.mt_transaction + mtCommision;
       if (cptFinancierSource.solde < montant_total ) return { status: false, message: "Désolé, solde du compte insuffisant pour cette opération." };
     
       try{ 
        let newSoldeDestination = (cptFinancierDestination.solde + createTransactionDto.mt_transaction).toFixed(2);
        await this.COMPTE_FINANCIER.findByIdAndUpdate(cptFinancierDestination._id, {solde: newSoldeDestination });
        let newSoldeSource = (cptFinancierSource.solde - montant_total).toFixed(2);
        await this.COMPTE_FINANCIER.findByIdAndUpdate(cptFinancierSource._id, {solde: newSoldeSource });
        createTransactionDto.status_transaction = "SUCCESS";
        createTransactionDto.commision = mtCommision;
        let transactionData = await this.TRANSACTION.create(createTransactionDto);
              if(createTransactionDto.application != "PAYMEQUICK") {
                let callBackBody = {
                      "timestamp": Date.now(),
                      "trid": createTransactionDto.trid,
                      "statusCode": "702102",
                      "status": "SUCCESS"
                  }
                const collectstd = await axios.post(createTransactionDto.call_back_url, callBackBody, {"headers": this.onHeader({}, {}, "collectstd", "POST"), });
              }  
        const smsSend = this.SMS.onSMS_send("Vous avez recu un transfert de: " + createTransactionDto.mt_transaction + " FCFA dans votre comptre PAYMEQUICK, votre nouveau solde est de: " + newSoldeDestination + " FCFA.\nN° Emetteur: " + cptFinancierSource.userId.phone + ", Transaction ID: " + transactionData._id + "\n\nMerci pour votre confiance."  , createTransactionDto.service_phone.toString());
        return {status: true, data: createTransactionDto, message: "Opération en cours d'execution." };

      }catch(err){
        return {status: false, error: err, message: "Une Erreur est survenue lors de l'execution." };
      }
    }

    return {status: false,  message: "Une Erreur est survenue lors de l'execution. Vérifier les données envoyer" };
  }




  async onFindAllTransactionById(cptFinId) {
    let transactionData = await this.TRANSACTION.find().or([{source_compte_id: cptFinId}, {destination_compte_id: cptFinId} ]).sort({ createdAt: -1 });
    return {status: true, message: "Les transaction de l'utilisateur", data: transactionData };
  }



  async onFindAllPaiementDifererById(service_phone) {
    let transactionData = await this.TRANSACTION.find().where({ status_transaction: "PENDING", service: "PAYMEQUICK", service_phone: service_phone  }).sort({ createdAt: -1 });
    return {status: true, message: "Les transaction de l'utilisateur", data: transactionData };
  }
  

  async onFindStatusTransaction(trid){
    let statusData = await this.TRANSACTION.findOne().where({trid: trid})
    return {status: true, message: "Le status de la transaction", data: statusData}
  }


  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }





  async onCallBackFunction(callBackDto: CallBackDTO){
    let transaction: any =  await this.TRANSACTION.findById(callBackDto.trid)

    if(callBackDto.status === "SUCCESS"){
      if(transaction.serviceCode == "20053" || transaction.serviceCode == "50053" && transaction.service != "PAYMEQUICK"  ){
        let compteFinData: any = await this.COMPTE_FINANCIER.findById(transaction.destination_compte_id);
        let mtCommision = this.onCommissionCalcule(transaction.mt_transaction, transaction.type_transaction, transaction.service);
        let montant_total = transaction.mt_transaction - mtCommision;
        let newSolde: number =  +(compteFinData.solde + montant_total).toFixed(2);
        let compteFinUpdate = await this.COMPTE_FINANCIER.findByIdAndUpdate(compteFinData._id, {solde: newSolde });
        let transactionUpdate = await this.TRANSACTION.findByIdAndUpdate(callBackDto.trid, {status_transaction: "SUCCESS", commision: mtCommision, })
        if(transaction.application != "PAYMEQUICK") {
          let callBackBody = {
                "timestamp": Date.now(),
                "trid": transaction.trid,
                "statusCode": "702102",
                "status": callBackDto.status
            }
          const collectstd = await axios.post(transaction.call_back_url, callBackBody, {"headers": this.onHeader({}, {}, "collectstd", "POST"), });
        } 
      }
      
      if(transaction.serviceCode == "90003" || transaction.serviceCode == "50052" && transaction.service != "PAYMEQUICK" ){
        // let compteFinData: any = await this.COMPTE_FINANCIER.findById(transaction.source_compte_id)
        // let mtCommision = this.onCommissionCalcule(transaction.mt_transaction, transaction.type_transaction, transaction.service);
        // let montant_total = transaction.mt_transaction + mtCommision;

        // if (compteFinData.solde < montant_total ) {
        //       if(transaction.application != "PAYMEQUICK") {
        //         let callBackBody = {
        //               "timestamp": Date.now(),
        //               "trid": transaction.trid,
        //               "statusCode": "702102",
        //               "status": "ERRORED"
        //           }
        //         const collectstd = await axios.post(transaction.call_back_url, callBackBody, {"headers": this.onHeader({}, {}, "collectstd", "POST"), });
        //       } 
        //     return {status: false, message: "Désolé, solde du compte insuffisant pour cette opération."}
        //   };
        
        // let newSolde: number =  +(compteFinData.solde - montant_total).toFixed(2);
        // let compteFinUpdate = await this.COMPTE_FINANCIER.findByIdAndUpdate(compteFinData._id, {solde: newSolde });
        let transactionUpdate = await this.TRANSACTION.findByIdAndUpdate(callBackDto.trid, {status_transaction: "SUCCESS", })
        if(transaction.application != "PAYMEQUICK") {
          let callBackBody = {
                "timestamp": Date.now(),
                "trid": transaction.trid,
                "statusCode": "702102",
                "status": callBackDto.status
            }
          const collectstd = await axios.post(transaction.call_back_url, callBackBody, {"headers": this.onHeader({}, {}, "collectstd", "POST"), });
        } 
      }
    }

    if(callBackDto.status != "SUCCESS"){
      let transactionUpdate = await this.TRANSACTION.findByIdAndUpdate(transaction._id, {status_transaction: callBackDto.status, })
      if(transaction.application != "PAYMEQUICK") {
        let callBackBody = {
              "timestamp": Date.now(),
              "trid": transaction.trid,
              "statusCode": "702102",
              "status": callBackDto.status
          }
        const collectstd = await axios.post(transaction.call_back_url, callBackBody, {"headers": this.onHeader({}, {}, "collectstd", "POST"), });
          
      } 
    }
  
  }



  async onPaiementDiffere(id: string, source_compte_id: string, codeSecret: string ){
      let cptFinancierSource: any = await this.COMPTE_FINANCIER.findById(source_compte_id).populate("userId")
      let transaction: any =  await this.TRANSACTION.findById(id)

      const match = await bcrypt.compare(codeSecret, cptFinancierSource.userId.codeSecret);
      if (!match) return { status: false, message: "Désolé, identifiants incorrect." };
      let mtCommision = this.onCommissionCalcule(transaction.mt_transaction, transaction.type_transaction, transaction.service);
      let montant_total = transaction.mt_transaction + mtCommision;
      if(cptFinancierSource.solde < montant_total ) return { status: false, message: "Désolé, solde du compte insuffisant." };

      let cptFinancierDestination: any = await this.COMPTE_FINANCIER.findById(transaction.destination_compte_id).populate("userId")
      try{ 
        let newSoldeDestination = (cptFinancierDestination.solde + transaction.mt_transaction).toFixed(2);
        await this.COMPTE_FINANCIER.findByIdAndUpdate(transaction.destination_compte_id, {solde: newSoldeDestination });
        let newSoldeSource = (cptFinancierSource.solde - montant_total).toFixed(2);
        await this.COMPTE_FINANCIER.findByIdAndUpdate(cptFinancierSource._id, {solde: newSoldeSource });
        transaction.status_transaction = "SUCCESS";
        let transactionUpdate = await this.TRANSACTION.findByIdAndUpdate(id, {status_transaction: "SUCCESS", commision: mtCommision, source_compte_id: source_compte_id })
              if(transaction.application != "PAYMEQUICK") {
                let callBackBody = {
                      "timestamp": Date.now(),
                      "trid": transaction.trid,
                      "statusCode": "702102",
                      "status": "SUCCESS"
                  }
                const collectstd = await axios.post(transaction.call_back_url, callBackBody, {"headers": this.onHeader({}, {}, "collectstd", "POST"), });
              }  
        const smsSend = this.SMS.onSMS_send("Vous avez recu un transfert de: " + transaction.mt_transaction + " FCFA dans votre comptre PAYMEQUICK, votre nouveau solde est de: " + newSoldeDestination + " FCFA.\nN° Emetteur: " + cptFinancierSource.userId.phone + ", Transaction ID: " + transaction._id + "\n\nMerci pour votre confiance."  , cptFinancierDestination.phone.toString());
        return {status: true, data: transaction, message: "Opération éffectuée avec succès." };

      }catch(err){
        return {status: false, error: err, message: "Une Erreur est survenue lors de l'execution." };
      }


  }




  onCommissionCalcule(mt_transaction, type_transaction, service ){
    return 0 ;
  }



}
