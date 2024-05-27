import { Injectable } from '@nestjs/common';
import { CreateHistoriqueConnexionDto } from './dto/create-historique-connexion.dto';
import { UpdateHistoriqueConnexionDto } from './dto/update-historique-connexion.dto';

@Injectable()
export class HistoriqueConnexionService {
  create(createHistoriqueConnexionDto: CreateHistoriqueConnexionDto) {
    return 'This action adds a new historiqueConnexion';
  }

  findAll() {
    return `This action returns all historiqueConnexion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} historiqueConnexion`;
  }

  update(id: number, updateHistoriqueConnexionDto: UpdateHistoriqueConnexionDto) {
    return `This action updates a #${id} historiqueConnexion`;
  }

  remove(id: number) {
    return `This action removes a #${id} historiqueConnexion`;
  }
}
