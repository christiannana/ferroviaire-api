import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';

import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // app.useGlobalGuards(new AuthGuard());
  // app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 3000);

}
  
bootstrap();
 

  

// import { NestFactory } from '@nestjs/core';
// import { ExpressAdapter } from '@nestjs/platform-express';
// import * as express from 'express';
// import * as functions from 'firebase-functions';
 
// import { AppModule } from './app.module';
// const expressServer = express();
 
// const createFunction = async (expressInstance): Promise<void> => {
//   const app = await NestFactory.create(
//     AppModule,
//     new ExpressAdapter(expressInstance), 
//     { cors: true },
//   );
//   await app.init();
// }; 
 
// export const api_ferroviaire = functions.region('europe-west1')
//   .https.onRequest(async (request, response) => { 
//     await createFunction(expressServer);
//     expressServer(request, response); 
// });




  // erp-yewi-benawa2023
  // mongodb+srv://itfcatenaire:BD9hovsTSr9AlWfy@developpementdb.jk7xk9h.mongodb.net/ERP_DATABASE?retryWrites=true&w=majority
