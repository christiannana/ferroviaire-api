
import { HttpService, Injectable } from '@nestjs/common';
import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class SmsService {

    onHeader(){
       let header = {
        "Accept": "application/json",
        "Content-Type": "application/json"
       };
       return header;
    }

    constructor(private readonly httpService: HttpService) {}

    async onSMS_send(sms:string, phone:string) {
        let url = "https://smsvas.com/bulk/public/index.php/api/v1/sendsms";
        let datas =  {
            "user": process.env.SMS_USER,
            "password": process.env.SMS_PASSWORD,
            "senderid": process.env.SMS_SENDER,
            "sms": sms,
            "mobiles": phone
           }
           
        const response = await axios.post(url, datas,  {"headers": this.onHeader() } );
        return response.data;
    }

      
}
