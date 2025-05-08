import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Speaker } from './entities/speaker.entity';
import { Repository } from 'typeorm';
import { Project } from 'src/project/entities/project.entity';
import { InputCreateSpeakerDto } from './dto/input.create-speaker.dto';
import { InputUpdateSpeakerDto } from './dto/input.update-speaker.dto';
import {OutputGetSpeakerDto} from "./dto/output.get-speaker.dto";
import {OutputGetPaginatedSpeakerDto} from "./dto/output.get-paginated-speakers.dto";

@Injectable()
export class SpeakerService {
  constructor(
    @InjectRepository(Speaker) private readonly speakerRepository: Repository<Speaker>,
    @InjectRepository(Project) private readonly projectRepository: Repository<Project>
  ) {}
  
  async create(createSpeakerDto: InputCreateSpeakerDto): Promise<OutputGetSpeakerDto> {
    const { projectId, ...speakerData } = createSpeakerDto;
    const project = await this.projectRepository.findOneBy({ id: projectId });
    
    if (!project) throw new BadRequestException(`Project with id "${projectId}" doesn't exist`);
    
    const newSpeaker = this.speakerRepository.create({
      ...speakerData,
      project,
    });

    const speaker = await  this.speakerRepository.save(newSpeaker);
    return {
      id: speaker.id,
      name: speaker.name,
      image: speaker.image,
      createdAt: speaker.createdAt.toISOString(),
      updatedAt: speaker.updatedAt.toISOString(),
      project: speaker.project.id,
    } as OutputGetSpeakerDto;
  }

  async findAll(
      projectId?: string,
      limit?: number,
      page?: number,
      order: "DESC" | "ASC" | "asc" | "desc" = "DESC"
  ): Promise<OutputGetPaginatedSpeakerDto> {
    // Upewniamy się, że wartości mają sens
    if (!limit || limit <= 0) {
      limit = 10;
    }

    if (!page || page <= 0) {
      page = 1;
    }

    // Składamy parametry dla findAndCount
    const whereClause = projectId ? { project: { id: projectId } } : {};

    const [data, total] = await this.speakerRepository.findAndCount({
      where: whereClause,
      relations: ['project'],
      take: limit,
      skip: (page - 1) * limit,
      order: { updatedAt: order }
    });

    const speakerArray = data.map((elem: Speaker) => ({
      id: elem.id,
      name: elem.name,
      image: elem.image,
      createdAt: elem.createdAt.toISOString(),
      updatedAt: elem.updatedAt.toISOString(),
      project: elem.project.id,
    }))
    let outputData = {
      data: speakerArray,
      total,
      pages: 0
    }
    if (limit) outputData.pages = Math.ceil(total / limit);
    const output = new OutputGetPaginatedSpeakerDto();
    Object.assign(output, outputData);

    return output;
  }
  
  async findOne(id: string): Promise<OutputGetSpeakerDto> {
    const speaker = await this.speakerRepository.findOne({
      where: { id },
      relations: ['project'],
    });
    if (!speaker) throw new NotFoundException(`Speaker with ID "${id}" not found.`);
    return {
      id: speaker.id,
      name: speaker.name,
      image: speaker.image,
      createdAt: speaker.createdAt.toISOString(),
      updatedAt: speaker.updatedAt.toISOString(),
      project: speaker.project.id,
    } as OutputGetSpeakerDto;
  }
  
  async update(id: string, updateSpeakerDto: InputUpdateSpeakerDto): Promise<OutputGetSpeakerDto> {
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
    await this.speakerRepository.save(speaker);
    const output = await this.speakerRepository.findOne({ where: { id: speaker.id }, relations: ['project'] });
    console.log(output);
    return {
      id: output?.id,
      name: output?.name,
      image: output?.image,
      createdAt: output?.createdAt.toISOString(),
      updatedAt: output?.updatedAt.toISOString(),
      project: output?.project?.id,
    } as OutputGetSpeakerDto;
  }
  
  async remove(id: string): Promise<void> {
    const result = await this.speakerRepository.delete({ id });
    if (result.affected === 0) throw new NotFoundException(`Speaker with ID "${id} not found"`)
  }
}
