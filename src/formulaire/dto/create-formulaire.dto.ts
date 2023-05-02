export class CreateTrameDto {

    formulaire: string;
    typeFormulaire: String;
    domaine: String;
    titre: String;
    date: String

}



export class CreateQuestionnaireDto {

    formulaire: Object;
    typeFormulaire: String;
    categorieQuestionnaire: String;
    typeQuestionnaire: String;
    titre: String;
    periodicite: String;
    delaisAlerte: String;
    formation: String;
    habilitation: String;
    date: Date

}
