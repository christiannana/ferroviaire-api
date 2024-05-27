import { Injectable } from '@nestjs/common';
import { CreateInformAllCityDto } from './dto/create-inform-all-city.dto';
import { UpdateInformAllCityDto } from './dto/update-inform-all-city.dto';

@Injectable()
export class InformAllCityService {
  create(createInformAllCityDto: CreateInformAllCityDto) {
    return 'This action adds a new informAllCity';
  }

  findAll() {
    return `This action returns all informAllCity`;
  }

  findOne(id: number) {
    return `This action returns a #${id} informAllCity`;
  }

  update(id: number, updateInformAllCityDto: UpdateInformAllCityDto) {
    return `This action updates a #${id} informAllCity`;
  }

  remove(id: number) {
    return `This action removes a #${id} informAllCity`;
  }
}
