import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFerroviaireDto } from './dto/create-ferroviaire.dto';
import { UpdateFerroviaireDto } from './dto/update-ferroviaire.dto';

@Injectable()
export class FerroviaireService {


  constructor(
    @InjectModel('trame') private Trame: Model<any>,
  ) {}


  create(createFerroviaireDto: CreateFerroviaireDto) {
    return 'This action adds a new ferroviaire';
  }

  findAll() {
    return `This action returns all ferroviaire`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ferroviaire`;
  }

  update(id: number, updateFerroviaireDto: UpdateFerroviaireDto) {
    return `This action updates a #${id} ferroviaire`;
  }

  remove(id: number) {
    return `This action removes a #${id} ferroviaire`;
  }
}
