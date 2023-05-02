
export class CreatePlanPecDto {

    entrepriseId: String;
    clientId: String;
    chantier: String;
    auteur: String;
    modificateur: String;
    zoneRaille: String;
    zoneChantier: String;
    tension: String;
    periodeApplicationDebut: String;
    periodeApplicationFin: String;
    periodeApplication: String;
    imagePlan: String;
    numeroPlanPEC: String;
    legende: {};
    nbrCV: String;
    nbrCLR: String;
    // historiqueModification: [];
    ecranInitDX: Number;
    ecranInitDY: Number;
    particulariteLocale: {};
    brouillon: boolean;
}

export class DiffusionPDFDto {
    email: string;
    urlPDF: String;
    auteur: String;
    typePDF: String;
}




