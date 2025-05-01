import { Choice } from "src/choice/entities/choice.entity";
import { DialogueTree } from "src/dialoguetree/entities/dialoguetree.entity";
import { Speaker } from "src/speaker/entities/speaker.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Dialogue {
  @PrimaryGeneratedColumn('increment')
  id: number;
  
  @Column('text')
  text: string;
  
  @Column('text', { nullable: true })
  notes: string | null;
  
  @CreateDateColumn()
  createdAt: Date;
  
  @UpdateDateColumn()
  updatedAt: Date;
  
  @OneToMany(() => Choice, (choice) => choice.dialogue)
  choices: Choice[];
  
  @ManyToOne(
    () => DialogueTree, 
    (dialogueTree) => dialogueTree.dialogues,
    {
      onDelete: "CASCADE",
      nullable: false,
    }
  )
  dialogueTree: DialogueTree;
  
  @ManyToOne(() => Speaker, (speaker) => speaker.dialogues)
  speaker: Speaker;
}