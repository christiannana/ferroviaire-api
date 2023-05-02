import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePlanPecDto, DiffusionPDFDto } from './dto/create-plan-pec.dto';
import { UpdatePlanPecDto } from './dto/update-plan-pec.dto';

@Injectable()
export class PlanPecService {
  EmailSender = "Plan@catenaire.fr"
  constructor( 
    @InjectModel('planPECdata') private planPECdata: Model<0>,
    @InjectModel('personnelData') private personnelData: Model<0>,
    @InjectModel('pdfEnvoyerData') private pdfEnvoyerData: Model<0>,
    private mailerService: MailerService,
  ){}


  async create(createPlanPecDto: CreatePlanPecDto) {
    let checkAutorisation: any = await this.personnelData.findById(createPlanPecDto.auteur.toString());
    if(checkAutorisation.droitAcces == "Bloquer") return {statut: false, message: "Désolé votre statut ne vous permert pas de créer ou modifier un plan PEC"};
    let planData = await this.planPECdata.create(createPlanPecDto)
    console.log(planData);
    return {statut: true, message: "Plan PEC enregistré avec succès" };
  }

  async findAll() {
    let data = await this.planPECdata.find().populate('auteur').populate('modificateur').sort({updatedAt: -1}).limit(260);
    return {statut: true, data: data};
  } 

  async findAllBrouillon(brouillon) {
    let data = await this.planPECdata.find().where({brouillon: brouillon}).populate('auteur').populate('modificateur').sort({updatedAt: -1});
    return {statut: true, data: data};
  } 

  async findOne(id: string) {
    console.log(id)
    let data = await this.planPECdata.findById(id).populate('auteur').populate('modificateur')
    console.log(data)
    return {statut: true, data: data}; 
  }

  async update(id: String , updatePlanPecDto: UpdatePlanPecDto) {
    let checkAutorisation: any = await this.personnelData.findById(updatePlanPecDto.modificateur.toString());
    if(checkAutorisation.droitAcces == "Bloquer") return {statut: false, message: "Désolé votre statut ne vous permert pas de créer ou modifier un plan PEC"};
    let modificateurData = await this.personnelData.findById(updatePlanPecDto.modificateur.toString());
    let historique = {
      "modificateurData": modificateurData,
      "date": Date.now(),
    }
    // let historiqueProcess = await this.planPECdata.findByIdAndUpdate<UpdatePlanPecDto>(id, {  $addToSet: { historiqueModification : historique } },).exec();
    let doc:any = await this.planPECdata.findById(id);
        doc.historiqueModification.addToSet(historique);
    await doc.save();
   
    let plaPECData = await this.planPECdata.findByIdAndUpdate(id, updatePlanPecDto ) 
    return {statut: true, message: "Plan PEC Modifier avec succès" };
  } 

  async remove(id: string) { 
    let plaPECData = await this.planPECdata.findByIdAndDelete(id) 
    return {statut: true, message: "Plan PEC Supprimer avec succès", data: plaPECData};
  }

   
  
  async onDiffusionPDF(diffusion: DiffusionPDFDto) {
    let pdfData = await this.pdfEnvoyerData.create(diffusion);
    await  this.mailerService
        .sendMail({
          to: diffusion.email, // list of receivers
          from: this.EmailSender, // sender address
          subject: "Diffusion PDF", // Subject line
          text: 'Envoie des email', // plaintext body
          html: diffusion.typePDF + "<br/>Merci de télécharger le PDF via le lien suivant,  " + "<br/><br/>Lien du document: <a href='https://ferroviaire-principal.web.app/interface-partage-documentsPDF/"+ pdfData._id+"' >Cliquer ici pour Télécharger le document en PDF</a> , <br/><br/>Document envoyé par " + diffusion.auteur + "<br/>Crdlt."// HTML body content
          //template: "wellcome"
          //html:  'Votre mot de passe a été mis à jour.  Si vous n\'êtes pas l\'auteur de cette demande, veuillez nous contacter  :<br/> <a href="https://ferroviaire-principal.web.app" target="_blank">Contactez Défifreelance</a> <br/><br/><img height="80" src="https://defifreelance-admin.defifreelance.fr/assets/imgs/LogoRouge.png" alt="mailtrap" />',
        })
        .then(() => { 
          console.log('Email envoyé avec succès.');
        })
        .catch((err) => {
          console.log('Email Erreur 403 = ' + err);
        });
    return {statut: true , message: "Document pdf diffusé avec succès."};
  }

  async onReadPDFData(id: string) {
    console.log(id)
    let data = await this.pdfEnvoyerData.findById(id);
    return {statut: true, data: data}; 
  }


}



