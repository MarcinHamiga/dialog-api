import { Module } from '@nestjs/common';
import { ChoiceController } from './choice.controller';
import { ChoiceService } from './choice.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Choice } from './entities/choice.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Choice])
  ],
  controllers: [ChoiceController],
  providers: [ChoiceService]
})
export class ChoiceModule {}
