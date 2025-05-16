import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {DialogueTree} from "./entities/dialoguetree.entity";
import {Repository} from "typeorm";
import {OutputGetDialogueTreeDto} from "./dto/output.get-dialogue-tree.dto";
import {OutputGetPaginatedDialogueTreeDto} from "./dto/output.get-paginated-dialogue-tree.dto";
import {InputCreateDialogueTreeDto} from "./dto/input.create-dialogue-tree.dto";
import {InputUpdateDialogueTreeDto} from "./dto/input.update-dialogue-tree.dto";
import {transformToDto} from "../util";

@Injectable()
export class DialoguetreeService {
    constructor(
        @InjectRepository(DialogueTree) private readonly dialoguetreeRepository: Repository<DialogueTree>,
    ) {}

    async findOne(id: string): Promise<OutputGetDialogueTreeDto> {
        const dialogueTree = await this.dialoguetreeRepository.findOne({where: {id: id}});
        if (!dialogueTree) throw new NotFoundException("Dialoguetree not found");
        return transformToDto(OutputGetDialogueTreeDto, dialogueTree);
    }

    async findAll(
        take?: number,
        skip?: number,
    ): Promise<OutputGetDialogueTreeDto[]> {
        if (!take || take <= 0) {
            take = 20;
        }

        if (!skip || skip <= 0) {
            skip = 1;
        }

        const output = await this.dialoguetreeRepository.find({
            take,
            skip: (skip - 1) * take,
        })

        return output.map((elem: DialogueTree) => {return transformToDto(OutputGetDialogueTreeDto, elem)})
    }

    async findByProject(
        projectId: string,
        take?: number,
        skip?: number,
        order?: "ASC" | "DESC" | "asc" | "desc"
    ): Promise<OutputGetPaginatedDialogueTreeDto> {
        if (!take || take <= 0) {
            take = 11;
        }

        if (!skip || skip <= 0) {
            skip = 1;
        }

        const whereClause = projectId ? { project: { id: projectId } } : {};

        const [data, total] = await this.dialoguetreeRepository.findAndCount({
            where: whereClause,
            take: take ? take : undefined,
            skip: (skip && take) ? (skip - 1) * take : undefined,
            order: { updatedAt: order ? order : "DESC"},
        });

        const dialogueTreeDtos: OutputGetDialogueTreeDto[] = data.map((elem: DialogueTree) => {return transformToDto(OutputGetDialogueTreeDto, elem)});

        return transformToDto(OutputGetPaginatedDialogueTreeDto, {
            data: dialogueTreeDtos,
            total,
            pages: total ? Math.ceil(total / take) : undefined,
        });
    }

    async create(
        input: InputCreateDialogueTreeDto,
    ): Promise<OutputGetDialogueTreeDto> {
        const existing = await this.dialoguetreeRepository.findOne({
            where: {
                treeId: input.treeId,
                project: { id: input.projectId },
            },
            relations: ['project'],
        });

        if (existing) {
            throw new BadRequestException(
                `A dialogue tree with treeId '${input.treeId}' already exists in this project.`,
            );
        }

        const newTree = this.dialoguetreeRepository.create({
            ...input,
            project: { id: input.projectId } as any,
        });

        const saved = await this.dialoguetreeRepository.save(newTree);
        return transformToDto(OutputGetDialogueTreeDto, saved);
    }

    async update(
        id: string,
        input: InputUpdateDialogueTreeDto,
    ): Promise<OutputGetDialogueTreeDto> {
        const tree = await this.dialoguetreeRepository.findOne({
            where: { id },
            relations: ['project'],
        });

        if (!tree) throw new NotFoundException('Dialogue tree not found');

        // Jeśli treeId się zmienia, sprawdzamy kolizję
        if (
            input.treeId &&
            input.treeId !== tree.treeId
        ) {
            const duplicate = await this.dialoguetreeRepository.findOne({
                where: {
                    treeId: input.treeId,
                    project: { id: tree.project.id },
                },
                relations: ['project'],
            });

            if (duplicate) {
                throw new BadRequestException(
                    `Another dialogue tree with treeId '${input.treeId}' already exists in this project.`,
                );
            }

            tree.treeId = input.treeId;
        }

        if (input.treeName !== undefined) tree.treeName = input.treeName;

        const updated = await this.dialoguetreeRepository.save(tree);
        return transformToDto(OutputGetDialogueTreeDto, updated);
    }

    async delete(id: string): Promise<void> {
        const result = await this.dialoguetreeRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException('Dialogue tree not found');
        }
    }
}
