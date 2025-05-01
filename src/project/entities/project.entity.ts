import { DialogueTree } from "src/dialoguetree/entities/dialoguetree.entity";
import { Speaker } from "src/speaker/entities/speaker.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column({ length: 100, unique: true })
  name: string;
  
  @Column({ type: 'text', nullable: true })
  description: string | null;
  
  @CreateDateColumn()
  createdAt: Date;
  
  @UpdateDateColumn()
  updatedAt: Date;
  
  @OneToMany(() => Speaker, (speaker) => speaker.project)
  speakers: Speaker[];
  
  @OneToMany(() => DialogueTree, (dialogueTree) => dialogueTree.project)
  dialogueTrees: DialogueTree[];
}