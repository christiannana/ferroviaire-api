import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLegendeDto } from './dto/create-legende.dto';
import { UpdateLegendeDto } from './dto/update-legende.dto';

@Injectable()
export class LegendesService {

  
  constructor(
    @InjectModel('legendeData') private legendeData: Model<0>,
  ){}


 async create(createLegendeDto: CreateLegendeDto) {
    let legende = await this.legendeData.create(createLegendeDto);
    return {statut: true, message: "Perssonnel enregistré avec succès"};
  }
       
  async findAll() {          
    let datas = await this.legendeData.find().sort({date: -1});
    return {statut: true, data: datas};
  }

  findOne(id: string) {
    return `This action returns a #${id} legende`;
  }

 async update(id: string, updateLegendeDto: UpdateLegendeDto) {
    let action = await this.legendeData.findByIdAndUpdate(id, updateLegendeDto)
    return {statut: true, message: "Modification effectué avec succès"};
  }

 async remove(id: string) {
    let action = await this.legendeData.findByIdAndDelete(id);
    return {statut: true, message: "Personnel supprimé avec succès"};
  }
}
