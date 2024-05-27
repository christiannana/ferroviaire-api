import { IsString, IsNotEmpty, IsEmail } from 'class-validator';


export class CreateUserAccountDto {
    nom: String;
    prenom: String;

    @IsString()
    @IsNotEmpty()
    phone: string;
    codeSecret: String;
    cniRecto: String;
    cniVerso: String;
    cni: String;
    sexe: String;
    type_user: String;
    kyc: {};
    kycVerify: Boolean = false;
    phoneVerify: Boolean = false;
    // @IsEmail()
    email: String;
    raisonSocial: String;
    addresse: String;
    code: String;

}

export class ModifieUserAccountDto {
    nom: String;
    prenom: String;
    cniRecto: String;
    cniVerso: String;
    cni: String;
    sexe: String;
    kyc: {};
    kycVerify: Boolean;
    phoneVerify: Boolean;
    email: String;
    raisonSocial: String;
    addresse: String;
    code: String;

}

