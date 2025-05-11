import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from './project/project.module';
import { SpeakerModule } from './speaker/speaker.module';
import { DialogueModule } from './dialogue/dialogue.module';
import { ChoiceModule } from './choice/choice.module';
import { DialoguetreeModule } from './dialoguetree/dialoguetree.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Project } from './project/entities/project.entity';
import { Dialogue } from './dialogue/entities/dialogue.entity';
import { Choice } from './choice/entities/choice.entity';
import { Speaker } from './speaker/entities/speaker.entity';
import { DialogueTree } from './dialoguetree/entities/dialoguetree.entity';

@Module({
  imports: [
    ProjectModule, 
    SpeakerModule, 
    DialogueModule, 
    ChoiceModule, 
    DialoguetreeModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          type: 'sqlite',
          database: configService.get<string>('DATABASE_PATH', 'db.sqlite'),
          entities: [Project, Dialogue, Choice, Speaker, DialogueTree],
          synchronize: configService.get<string>('NODE_ENV') !== 'production',
          logging: configService.get<string>('NODE_ENV') !== 'production' ? ['query', 'error'] : ['error'],
        })
      }
    )
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  
}
