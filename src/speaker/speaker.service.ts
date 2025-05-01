import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Speaker } from './entities/speaker.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Project } from 'src/project/entities/project.entity';
import { CreateSpeakerDto } from './dto/create-speaker.dto';
import { UpdateSpeakerDto } from './dto/update-speaker.dto';

@Injectable()
export class SpeakerService {
  constructor(
    @InjectRepository(Speaker) private readonly speakerRepository: Repository<Speaker>,
    @InjectRepository(Project) private readonly projectRepository: Repository<Project>
  ) {}
  
  async create(createSpeakerDto: CreateSpeakerDto): Promise<Speaker> {
    const { projectId, ...speakerData } = createSpeakerDto;
    const project = await this.projectRepository.findOneBy({ id: projectId });
    
    if (!project) throw new BadRequestException(`Project with id "${projectId}" doesn't exist`);
    
    const newSpeaker = this.speakerRepository.create({
      ...speakerData,
      project,
    });
    
    return this.speakerRepository.save(newSpeaker);
  }
  
  async findAll(projectId?: string): Promise<Speaker[]> {
    const where: FindOptionsWhere<Speaker> = {};
    if (projectId) {
      where.project = { id: projectId };
    }
    return this.speakerRepository.find({ where, relations: ['project']});
  }
  
  async findOne(id: string): Promise<Speaker> {
    const speaker = await this.speakerRepository.findOne({
      where: { id },
      relations: ['project'],
    });
    if (!speaker) throw new NotFoundException(`Speaker with ID "${id}" not found.`);
    return speaker;
  }
  
  async update(id: string, updateSpeakerDto: UpdateSpeakerDto): Promise<Speaker> {
    const { projectId, ...speakerData } = updateSpeakerDto;
    const speaker = await this.speakerRepository.findOneBy({ id });
    if (!speaker) throw new NotFoundException(`Speaker with ID "${id}" not found.`);
    let project: Project | null = null;
    if (projectId) {
      project = await this.projectRepository.findOneBy({ id: projectId });
      if (!project) throw new BadRequestException(`Project with ID "${projectId}" not found`);
      speaker.project = project;
    }
    
    Object.assign(speaker, speakerData);
    
    return this.speakerRepository.save(speaker);
  }
  
  async remove(id: string): Promise<void> {
    const result = await this.speakerRepository.delete({ id });
    if (result.affected === 0) throw new NotFoundException(`Speaker with ID "${id} not found"`)
  }
}
