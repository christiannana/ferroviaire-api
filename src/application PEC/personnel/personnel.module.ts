import { Module } from '@nestjs/common';
import { PersonnelService } from './personnel.service';
import { PersonnelController } from './personnel.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { personnelData } from './schema_mongoDB/personnel.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'personnelData', schema: personnelData },
    ])
  ],
  controllers: [PersonnelController],
  providers: [PersonnelService]
})
export class PersonnelModule {}
