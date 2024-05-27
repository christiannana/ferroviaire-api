import { Injectable } from '@nestjs/common';
import { CreateCompteFinancierDto } from './dto/create-compte-financier.dto';
import { UpdateCompteFinancierDto } from './dto/update-compte-financier.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SmsService } from 'src/application PayMeQuick/shared/services/sms/sms.service';

@Injectable()
export class CompteFinancierService {

  constructor(
    @InjectModel('pay_COMPTE_FINANCIER') private COMPTE_FINANCIER: Model<0>,
    private SMS: SmsService
  ) { }
  
  create(createCompteFinancierDto: CreateCompteFinancierDto) {
    return 'This action adds a new compteFinancier';
  }

  findAll() {
    return `This action returns all compteFinancier`;
  }

  async findOne(id: string) {
    let cptData = await this.COMPTE_FINANCIER.findById(id)
    if (!cptData) return { status: false, message: "Désolé, identifiants incorrect." };
    return { status: true, message: "Le comptefinancier de l'utilisateur",  data: cptData };
  }

  async findOneByPhone(phone: string) {
    let cptData: any = await this.COMPTE_FINANCIER.findOne().where({phone: phone}).populate("userId");
    if (!cptData) return { status: false, message: "Désolé, numéro de téléphone incorrect." };
    if (cptData.userId.phoneVerify == false) return { status: false, message: "Désolé, numéro de téléphone incorrect." };
    let dataModifier = {_id: cptData._id,  nom:  cptData.userId.nom, prenom:  cptData.userId.prenom, phone: cptData.userId.phone, type_user: cptData.userId.type_user  }
    return { status: true, message: "Le comptefinancier de l'utilisateur",  data: dataModifier, };
  }

  update(id: string, updateCompteFinancierDto: UpdateCompteFinancierDto) {
    return `This action updates a #${id} compteFinancier`;
  }

  remove(id: string) {
    return `This action removes a #${id} compteFinancier`;
  }
}
