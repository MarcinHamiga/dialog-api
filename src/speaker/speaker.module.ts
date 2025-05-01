import { Module } from '@nestjs/common';
import { SpeakerController } from './speaker.controller';
import { SpeakerService } from './speaker.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Speaker } from './entities/speaker.entity';
import { Project } from 'src/project/entities/project.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Speaker, Project]),
  ],
  controllers: [SpeakerController],
  providers: [SpeakerService]
})
export class SpeakerModule {}
