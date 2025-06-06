import { Dialogue } from "src/dialogue/entities/dialogue.entity";
import { Project } from "src/project/entities/project.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class DialogueTree {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @ManyToOne(
    () => Project, 
    (project) => project.dialogueTrees,
    {
      onDelete: "CASCADE",
      nullable: false,
    }
  )
  project: Project;

  @Column({type: "text", length: 128})
  treeName: string;

  @Column({type: "text", length: 32})
  treeId: string;
  
  @CreateDateColumn()
  createdAt: Date;
  
  @UpdateDateColumn()
  updatedAt: Date;
  
  @OneToMany(() => Dialogue, (dialogue) => dialogue.dialogueTree)
  dialogues: Dialogue[]
}