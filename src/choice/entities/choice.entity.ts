import { Dialogue } from "src/dialogue/entities/dialogue.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Choice {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @ManyToOne(() => Dialogue, (dialogue) => dialogue.choices, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  dialogue: Dialogue;
  
  @Column('text', { nullable: false })
  text: string;
  
  @CreateDateColumn()
  createdAt: Date;
  
  @UpdateDateColumn()
  updatedAt: Date;
}