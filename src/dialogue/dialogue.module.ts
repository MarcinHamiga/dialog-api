import { Module } from '@nestjs/common';
import { DialogueController } from './dialogue.controller';
import { DialogueService } from './dialogue.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dialogue } from './entities/dialogue.entity';
import {DialogueTree} from "../dialoguetree/entities/dialoguetree.entity";
import {Speaker} from "../speaker/entities/speaker.entity";
import {Choice} from "../choice/entities/choice.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Dialogue, DialogueTree, Speaker, Choice])
  ],
  controllers: [DialogueController],
  providers: [DialogueService]
})
export class DialogueModule {}
