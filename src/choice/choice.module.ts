import { Module } from '@nestjs/common';
import { ChoiceController } from './choice.controller';
import { ChoiceService } from './choice.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Choice } from './entities/choice.entity';
import {Dialogue} from "../dialogue/entities/dialogue.entity";

@Module({
  imports:[
    TypeOrmModule.forFeature([Choice, Dialogue])
  ],
  controllers: [ChoiceController],
  providers: [ChoiceService]
})
export class ChoiceModule {}
