import { Module } from '@nestjs/common';
import { DialogueController } from './dialogue.controller';
import { DialogueService } from './dialogue.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dialogue } from './entities/dialogue.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Dialogue])
  ],
  controllers: [DialogueController],
  providers: [DialogueService]
})
export class DialogueModule {}
