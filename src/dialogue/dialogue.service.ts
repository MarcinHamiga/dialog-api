import {Injectable, NotFoundException} from '@nestjs/common';
import {DeepPartial, In, Repository} from "typeorm";
import {Dialogue} from "./entities/dialogue.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {OutputDialogueDto} from "./dto/output.dialogue.dto";
import {findOrFail, transformToDto} from "../util";
import {InputCreateDialogueDto} from "./dto/input.create-dialogue.dto";
import {DialogueTree} from "../dialoguetree/entities/dialoguetree.entity";
import {Speaker} from "../speaker/entities/speaker.entity";
import {InputUpdateDialogueDto} from "./dto/input.update-dialogue.dto";
import {Choice} from "../choice/entities/choice.entity";
import {OutputDialoguePaginatedDto} from "./dto/output.dialogue-paginated.dto";

@Injectable()
export class DialogueService {
    constructor(
        @InjectRepository(Dialogue) private dialogueRepository: Repository<Dialogue>,
        @InjectRepository(DialogueTree) private dialogueTreeRepository: Repository<DialogueTree>,
        @InjectRepository(Speaker) private speakerRepository: Repository<Speaker>,
        @InjectRepository(Choice) private choiceRepository: Repository<Choice>,
    ) {}

    async find(id: string): Promise<OutputDialogueDto> {
        const dialogue = await findOrFail(this.dialogueRepository, id, "Dialogue");
        return transformToDto(OutputDialogueDto, dialogue);
    }

    async findAll(): Promise<OutputDialogueDto[]> {
        const dialogues: Dialogue[] = await this.dialogueRepository.find({})
        return dialogues.map((elem: Dialogue) => {
            return transformToDto(OutputDialogueDto, elem);
        })
    }

    async findAllByDialogueTree(dialogueTreeId: string, take?: number, skip?: number) {
        if (!take || take <= 0) {
            take = 10;
        }
        if (!skip || skip <= 0) {
            skip = 1;
        }
        const [dialogues, total] = await this.dialogueRepository.findAndCount({
            where: {
                dialogueTree: {
                    id: dialogueTreeId
                }
            },
            take,
            skip: (skip - 1) * take,
            order: {
                position: "ASC"
            },
            relations: ['choices']
        })
        const data = dialogues.map((elem: Dialogue) => {
            return transformToDto(OutputDialogueDto, elem);
        })
        return transformToDto(OutputDialoguePaginatedDto, {
            data,
            total,
            pages: Math.ceil(total / take)
        })
    }

    async create(payload: InputCreateDialogueDto) {
        let next: Dialogue | null = null;
        let previous: Dialogue | null = null;
        let speaker: Speaker | null = null;
        const [_, position] = await this.dialogueRepository.findAndCount({ where: { dialogueTree: { id: payload.dialogueTree }}});
        const dialogueTree = await findOrFail(this.dialogueTreeRepository, payload.dialogueTree, "DialogueTree");
        if (payload.next) {
            next = await findOrFail(this.dialogueRepository, payload.next, "Dialogue");
        }
        if (payload.previous) {
            previous = await findOrFail(this.dialogueRepository, payload.previous, "Dialogue");
        }
        if (payload.speaker) {
            speaker = await findOrFail(this.speakerRepository, payload.speaker, "Speaker");
        }
        const dialogue: DeepPartial<Dialogue> = {
            text: payload.text,
            notes: payload.notes,
            dialogueTree,
            next,
            previous,
            position,
            speaker,
        }
        const newDialogue = this.dialogueRepository.create(dialogue);

        const output = await this.dialogueRepository.save(newDialogue);
        return transformToDto(OutputDialogueDto, output);
    }

    async update(id: string, payload: InputUpdateDialogueDto) {
        let updated = await this.dialogueRepository.findOne({ where: { id } });
        if (!updated)  throw new NotFoundException("Dialogue not found");

        if (payload.text) updated.text = payload.text;
        if (payload.notes)  updated.notes = payload.notes;
        if (payload.next) {
            updated.next = await findOrFail(this.dialogueRepository, payload.next, "Dialogue");
        }
        if (payload.previous) {
            updated.previous = await findOrFail(this.dialogueRepository, payload.previous, "Dialogue");
        }
        if (payload.speaker) {
            updated.speaker = await findOrFail(this.speakerRepository, payload.speaker, "Speaker");
        }
        if (payload.choices) {
            updated.choices = await this.choiceRepository.find({ where: { id: In(payload.choices) } })
            if (updated.choices.length !== payload.choices.length) throw new NotFoundException("One or more choices were not found.");
        }
        if (payload.dialogueTree) {
            updated.dialogueTree = await findOrFail(this.dialogueTreeRepository, payload.dialogueTree, "DialogueTree");
        }
        return transformToDto(OutputDialogueDto, await this.dialogueRepository.save(updated));
    }

    async delete(id: string): Promise<void> {
        const dialogue = await this.dialogueRepository.findOne({ where: { id }, relations: ["dialogueTree"] });
        if (!dialogue) {
            throw new NotFoundException("Dialogue not found");
        }
        const result =  await this.dialogueRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException("Dialogue not found");
        }
        const remaining = await this.dialogueRepository.find({
            where: {
                dialogueTree : {
                    id : dialogue.dialogueTree.id
                }
            },
            order: {
                position : "ASC"
            }
        });
        let position = 0;
        remaining.map((elem: Dialogue) => {
            elem.position = position;
            position++;
        })
        await this.dialogueRepository.save(remaining);
    }
}
