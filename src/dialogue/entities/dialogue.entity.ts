import { Choice } from "src/choice/entities/choice.entity";
import { DialogueTree } from "src/dialoguetree/entities/dialoguetree.entity";
import { Speaker } from "src/speaker/entities/speaker.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

@Entity()
export class Dialogue {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
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

  @Column("integer")
  position: number;

  @OneToOne(() => Dialogue, (dialogue) => dialogue.previous, { nullable: true })
  @JoinColumn()
  next: Dialogue | null;

  @OneToOne(() => Dialogue, (dialogue) => dialogue.next, { nullable: true })
  previous: Dialogue | null;
  
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
  speaker: Speaker | null;
}