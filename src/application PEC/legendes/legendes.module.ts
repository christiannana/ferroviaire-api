import { Module } from '@nestjs/common';
import { LegendesService } from './legendes.service';
import { LegendesController } from './legendes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { legendeData } from './schema_mongoDB/legenge.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'legendeData', schema: legendeData },
    ])
  ],
  controllers: [LegendesController],
  providers: [LegendesService]
})
export class LegendesModule {}
