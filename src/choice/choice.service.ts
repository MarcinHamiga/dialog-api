import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Choice} from "./entities/choice.entity";
import {DeepPartial, FindManyOptions, FindOptionsWhere, Repository} from "typeorm";
import {OutputChoiceDto} from "./dto/output.choice.dto";
import {findOrFail, transformToDto} from "../util";
import {InputCreateChoiceDto} from "./dto/input.create-choice.dto";
import {Dialogue} from "../dialogue/entities/dialogue.entity";
import {InputUpdateChoiceDto} from "./dto/input.update-choice.dto";

@Injectable()
export class ChoiceService {
    constructor(
        @InjectRepository(Choice) private readonly choiceRepository: Repository<Choice>,
        @InjectRepository(Dialogue) private readonly dialogueRepository: Repository<Dialogue>
    ) {
    }

    async findOne(id: string): Promise<OutputChoiceDto> {
        const choice = await findOrFail(this.choiceRepository, id, "Choice");
        return transformToDto(OutputChoiceDto, choice);
    }

    async findAll(): Promise<OutputChoiceDto[]> {
        const choices = await this.choiceRepository.find();
        return choices.map((elem: Choice) => transformToDto(OutputChoiceDto, elem))
    }

    async findAllByDialogue(dialogueId: string): Promise<OutputChoiceDto[]> {
        const whereClause: FindOptionsWhere<Choice> = { dialogue: { id: dialogueId } }
        const params: FindManyOptions<Choice> = {
            where: whereClause,
            order: {
                position: "ASC",
            }
        }
        const choices = await this.choiceRepository.find(params);
        return choices.map((elem: Choice) => transformToDto(OutputChoiceDto, elem));
    }

    async create(payload: InputCreateChoiceDto): Promise<OutputChoiceDto> {
        let dialogue: Dialogue = await findOrFail(this.dialogueRepository, payload.dialogue, "Dialogue");
        let next: Dialogue | null = null;
        if (payload.next) next = await findOrFail(this.dialogueRepository, payload.next, "Dialogue");
        const choice: DeepPartial<Choice> = {
            dialogue,
            text: payload.text,
            position: payload.position,
            next,
        }
        const newChoice: Choice = this.choiceRepository.create(choice);
        return transformToDto(OutputChoiceDto, this.choiceRepository.save(newChoice));
    }

    async update(id: string, payload: InputUpdateChoiceDto): Promise<OutputChoiceDto> {
        let choice = await this.choiceRepository.findOne({ where: { id: payload.id }, relations: ["Dialogue"] });
        if (!choice) throw new NotFoundException("Choice not found");
        let dialogue: Dialogue | undefined;
        let next: Dialogue | undefined;
        if (payload.dialogue) dialogue = await findOrFail(this.dialogueRepository, payload.dialogue, "Dialogue");
        if (payload.next) next = await findOrFail(this.dialogueRepository, payload.next, "Dialogue");
        Object.assign(choice, {
            text: payload.text ?? choice.text,
            position: payload.position ?? choice.position,
            next: next ??  choice.next,
            dialogue: dialogue ?? choice.dialogue,
        });
        const output = await this.choiceRepository.save(choice);
        return transformToDto(OutputChoiceDto, output);
    }

    async delete(id: string): Promise<void> {
        const output = await this.choiceRepository.delete(id);
        if (output.affected === 0) {
            throw new NotFoundException("Choice not found");
        }
    }
}
