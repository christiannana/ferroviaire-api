import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FormulaireExploitationService } from 'src/formulaire_Exploitation/formulaire.service';
import { CreatePersonnelDto } from './dto/create-personnel.dto';
import { UpdatePersonnelDto } from './dto/update-personnel.dto';

@Injectable()
export class PersonnelService {
  // EmailSender = "ITF@info.com";
     EmailSender = "Info@catenaire.fr"
  constructor(
    @InjectModel('personnelData') private personnelData: Model<0>,
    private mailerService: MailerService,
  ){}

  
  async onSendEmail( destinatair, objet, message) { 
    this.mailerService
      .sendMail({
        to: destinatair, // list of receivers
        from: this.EmailSender, // sender address
        subject: objet, // Subject line
        text: 'Envoie des email', // plaintext body
        html: message, // HTML body content
        //template: "wellcome"
        //html:  'Votre mot de passe a été mis à jour.  Si vous n\'êtes pas l\'auteur de cette demande, veuillez nous contacter  :<br/> <a href="http://www.dev.defifreelance.fr/contact" target="_blank">Contactez Défifreelance</a> <br/><br/><img height="80" src="https://defifreelance-admin.defifreelance.fr/assets/imgs/LogoRouge.png" alt="mailtrap" />',
      })
      .then(() => {
        console.log('Email envoyé avec succès.');
      })
      .catch((err) => {
        console.log('Email Erreur 403 = ' + err);
      });
  }

  async create(createPersonnelDto: CreatePersonnelDto) {
    let personnel = await this.personnelData.create(createPersonnelDto);
    this.onSendEmail(createPersonnelDto.emailProffessionnel, "Application E-PEC", "Bonjour " + createPersonnelDto.prenom + "  votre compte a été crée avec succès au seins de l'application E-PEC. Vos identifinats de connexion sont les suivants: <br/><br/>- Adresse mail: "+ createPersonnelDto.emailProffessionnel + "<br/>- Code d'accès: "+ createPersonnelDto.codeAcces + "<br/><br/> Cordialement.")
    return {statut: true, message: "Perssonnel enregistré avec succès"};
  }

  async findAll() {
    let personneldatas = await this.personnelData.find().sort({updatedAt: -1})
    return {statut: true, data: personneldatas};
  }

  async findOne(id: string) {
    let personnel = await this.personnelData.findById(id);
    return {statut: true, data: personnel};
  }

  async update(id: string, updatePersonnelDto: UpdatePersonnelDto) {
    let personnelData = await this.personnelData.findByIdAndUpdate(id, updatePersonnelDto);
    this.onSendEmail(updatePersonnelDto.emailProffessionnel, "Application E-PEC", "Mise ajout de votre compte, l'opération c'est déroulée avec succès au seins de l'application E-PEC. Vos identifinats de connexion sont les suivants: <br/><br/>- Adresse mail: "+ updatePersonnelDto.emailProffessionnel + "<br/>- Code d'accès: "+ updatePersonnelDto.codeAcces + "<br/><br/> Cordialement.")
    return {statut: true, message: "Modification effectué avec succès"};
  }

  async remove(id: string) {
    let personnelDelete = await this.personnelData.findByIdAndDelete(id);
    return {statut: true, message: "Personnel supprimé avec succès"};
  }
 
  //////////////////// CONNEXION DES AGENTS  /////////////////////////


 async onConnexionAgents(email, codeAcces){
  let dataAgent = await this.personnelData.findOne().where({emailProffessionnel: email, codeAcces: codeAcces });
    console.log(dataAgent)
    if(dataAgent) return {statut: true, data: dataAgent}
    
    return {statut: false, data: "Email ou code d'acces incorrect."}

  }




} 


