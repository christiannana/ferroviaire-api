import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserAccountDto } from './dto/create-users-account.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as randomatic from 'randomatic';
import { SmsService } from 'src/application PayMeQuick/shared/services/sms/sms.service';

import * as crypto from 'crypto'; 
import axios from 'axios';
import { UpdateUserAccountDto } from './dto/update-users-account.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class USER_AccountService {

  constructor(
    @InjectModel('pay_USER_ACCOUNT') private USER_ACCOUNT: Model<0>,
    @InjectModel('pay_HISTORIQUE_CONNEXION') private HISTORIQUE: Model<0>,
    @InjectModel('pay_COMPTE_FINANCIER') private COMPTE_FINANCIER: Model<0>,
    @InjectModel('pay_OTPCODE') private OTPCODE: Model<0>,
    private SMS: SmsService,
    private jwtService: JwtService
  ) { }

  async create(createUserAccountDto: CreateUserAccountDto) {
    let dataUSER_ACCOUNT: any = await this.USER_ACCOUNT.findOne().where({ phone: createUserAccountDto.phone, }).select({ codeSecret: 0 });
    let codeSecretRandom = randomatic('0', 5); // Generate a random 6-digit number
    const hashedPassword = await bcrypt.hash(codeSecretRandom, 10);
    createUserAccountDto.codeSecret = hashedPassword;
    let userAccountData
    let compteFinancier
    if(dataUSER_ACCOUNT){
      if (dataUSER_ACCOUNT.phoneVerify == true)  return { status: false, message: "Numéro de téléphone fourni est déjà pris.",}; // throw new BadRequestException('Invalid input');
      userAccountData = await this.USER_ACCOUNT.findByIdAndUpdate(dataUSER_ACCOUNT._id, createUserAccountDto, { new: true } )
    }else{
      userAccountData = await this.USER_ACCOUNT.create(createUserAccountDto);
      compteFinancier = await this.COMPTE_FINANCIER.create({ userId: userAccountData._id, phone: createUserAccountDto.phone, statusVerify: false, solde: 0 });
    }
        const smsSend = this.SMS.onSMS_send("Bienvenue chez PayMeQuick, votre compte a été créé avec succès,\n\nLe Code Secrèt par defaut est: " + codeSecretRandom + "\nVous pouvez faire des modifications au niveau des paramètres de l'application.\nVisitez notre site web pour mieux nous connaitre\nhttps://www.paymequick.com/about \n\nMerci pour votre confiance.", createUserAccountDto.phone);
    return { status: true, message: "Utilisateur créé avec succèc.", userData: userAccountData, compteFinancier: compteFinancier };
  }
  

  async onLogin(phone, codeSecret, platformVersion, modelName, manufacturer) {
    let userData: any = await this.USER_ACCOUNT.findOne().where({ phone: phone, });
    if (!userData) return { status: false, message: "Désolé, identifiants incorrect." };
    let compteFinancier = await this.COMPTE_FINANCIER.findOne().where({ userId: userData._id, });
    const match = await bcrypt.compare(codeSecret, userData.codeSecret);
    if (!match) return { status: false, message: "Désolé, identifiants incorrect." };
    let otpCheck = await this.HISTORIQUE.findOne().where({ userId: userData._id, });

    let OTP: boolean = false;
    if (otpCheck) {
      OTP = true;
      let OTPcode = randomatic('A0', 6);
      let otpCodeData = await this.OTPCODE.create({ userId: userData._id, phone: userData.phone, OTPcode: OTPcode });
      const smsSend = this.SMS.onSMS_send("Code OTP de vérification de compte: " + OTPcode, userData.phone);
    };

    let connexion = await this.HISTORIQUE.create({ userId: userData._id, phone_model: modelName, phone_manufacturer: manufacturer, phone_serie: platformVersion });
    if (userData.phoneVerify != true) {
      userData.phoneVerify = true;
      await userData.save();
    }
    userData.codeSecret = null;
    const payload: object = { id: userData._id, nom: userData.nom, prenom: userData.prenom, phone: userData.phone };
    let access_token = await this.jwtService.signAsync(payload);
    return { status: true, message: "Connexion avec succèc.", userData: userData, compte_financier: compteFinancier, access_token: access_token, OTP: OTP };
  }



  async onOTP_code_verify(userId: string, phone: string, otpcode: string) {
    console.log(otpcode)
    console.log(userId)
    let otpCode = await this.OTPCODE.findOne().where({ userId: userId, phone: phone, OTPcode: otpcode });
    if(!otpCode) return { status: false, message: "Code OTP incorrect." };
    await this.OTPCODE.deleteMany().where({userId: userId, phone: phone,})
    return { status: true, message: "Code OTP correct." };
  }




  async onOTP_renvoyer(userId: string, phone: string,){
      let OTPcode = randomatic('A0', 6);
      let otpCodeData = await this.OTPCODE.create({ userId: userId, phone: phone, OTPcode: OTPcode });
      const smsSend = this.SMS.onSMS_send("Code de vérification de compte: " + OTPcode, phone);
      return { status: true, message: "Code OTP renvoyer avec succès." };
  }



  async findAll() {
    let userData: any = await this.USER_ACCOUNT.find().exec();
    let compteFinancier = await this.COMPTE_FINANCIER.findOne().where({ userId: userData._id });
    return { status: true, message: "Opération réalisée avec succèc.", userData: userData, compte_financier: compteFinancier, };
  }



  async onCodeSecretUpdate(userId, ancienCode, nouveauCode){
    let userData:any = await this.USER_ACCOUNT.findById(userId);
    const match = await bcrypt.compare(ancienCode, userData.codeSecret);
    if (!match) return { status: false, message: "Désolé, identifiants incorrect." };
    const hashedPassword = await bcrypt.hash(nouveauCode, 10);
    userData.codeSecret = hashedPassword;
    await userData.save();
    return {status: true, message: "Votre code secret a été modifié avec succès."}
  }

  async update(id: string, updateUserAccountDto: UpdateUserAccountDto) {
    let userData = await this.USER_ACCOUNT.findByIdAndUpdate(id, updateUserAccountDto, { new: true });
    if (!userData) return { status: false, message: "Utilisateur inexistant" };
    return { status: true, message: "Utilisateur mis a jour", userData: userData, };
  }

  async remove(id: string, codeSecret: string) {
    let userData: any = await this.USER_ACCOUNT.findById(id).exec();
    const match = await bcrypt.compare(codeSecret, userData.codeSecret);
    if (!match) return { status: false, message: "Désolé, identifiants incorrect." };
    await this.USER_ACCOUNT.findByIdAndDelete(id).exec();
    return { status: true, message: "Données Utilisateur supprimé avec succès.", userData: userData, };
  }


}
