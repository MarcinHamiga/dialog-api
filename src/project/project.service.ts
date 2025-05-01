import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project) private readonly projectRepository: Repository<Project>
  ) {}
  
  /** 
  * Creates a new project in the database
  * @param createProjectDto - new project data
  * @returns Saved Project type object
  */
  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const newProject = this.projectRepository.create(createProjectDto);
    return this.projectRepository.save(newProject);
  }
  
  async findAll(): Promise<Project[]> {
    return this.projectRepository.find();
  }
  
  async findOne(id: string): Promise<Project> {
    const project = await this.projectRepository.findOneBy({ id });
    
    if (!project) {
      throw new NotFoundException(`Project with ID "${id}" not found.`);
    }
    
    return project;
  }
  
  async update(id: string, updateProjectDto: UpdateProjectDto): Promise<Project> {
    const project = await this.projectRepository.preload({
      id: id,
      ...updateProjectDto,
    });
    
    if (!project) {
      throw new NotFoundException(`Project with ID "${id}" not found`);
    }
    return this.projectRepository.save(project);
  }
 
 async remove(id: string): Promise<void> {
   const result = await this.projectRepository.delete({ id });
   
   if (result.affected === 0) {
     throw new NotFoundException(`Project with ID "${id}" not found`)
   }
 } 
}
