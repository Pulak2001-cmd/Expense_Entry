import { TypeOrmModule } from '@nestjs/typeorm';

import { Module } from '@nestjs/common';
import { ExpenceEntity } from './entity/expence.entity';
import { ExpenceController } from './controller/expence.controller';
import { ExpenceService } from './service/expence.service';

@Module({
  imports: [TypeOrmModule.forFeature([ExpenceEntity])],
  controllers: [ExpenceController],
  providers: [ExpenceService],
  exports: [ExpenceService],
})
export class ExpenceModule {}
