import { Injectable } from '@nestjs/common';
import { CreateBanqueShemaDto } from './dto/create-banque-shema.dto';
import { UpdateBanqueShemaDto } from './dto/update-banque-shema.dto';

@Injectable()
export class BanqueShemasService {
  create(createBanqueShemaDto: CreateBanqueShemaDto) {
    return 'This action adds a new banqueShema';
  }

  findAll() {
    return `This action returns all banqueShemas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} banqueShema`;
  }

  update(id: number, updateBanqueShemaDto: UpdateBanqueShemaDto) {
    return `This action updates a #${id} banqueShema`;
  }

  remove(id: number) {
    return `This action removes a #${id} banqueShema`;
  }
}
