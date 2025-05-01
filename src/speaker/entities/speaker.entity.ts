import { Dialogue } from "src/dialogue/entities/dialogue.entity";
import { Project } from "src/project/entities/project.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Speaker {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column({ length: 100, nullable: false })
  name: string;
  
  @Column({ nullable: true })
  image: string;
  
  @CreateDateColumn()
  createdAt: Date;
  
  @UpdateDateColumn()
  updatedAt: Date;
  
  @ManyToOne(() => Project, (project) => project.speakers, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  project: Project;
  
  @OneToMany(() => Dialogue, (dialogue) => dialogue.speaker)
  dialogues: Dialogue[];
}