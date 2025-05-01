import { Module } from '@nestjs/common';
import { DialoguetreeController } from './dialoguetree.controller';
import { DialoguetreeService } from './dialoguetree.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DialogueTree } from './entities/dialoguetree.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DialogueTree])
  ],
  controllers: [DialoguetreeController],
  providers: [DialoguetreeService]
})
export class DialoguetreeModule {}
