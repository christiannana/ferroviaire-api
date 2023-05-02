
export class CreateChantierDto {
    nomChantier: String;
    client: {};
    localisation: String;
    particularite: [];
    responsable: String;
    date: Date
}


export class CreateDossierChantierDto {
  auteur: String;
  chantierId: String;
  categorie: String;
  nom: String;
  dossierId: String;
  extention: String;
  lienFichier: String;
  taille: String;
}
