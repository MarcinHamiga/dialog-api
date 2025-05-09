import {IsArray, IsOptional, IsString, IsUUID} from "class-validator";

export class InputUpdateDialogueDto {
    @IsUUID()
    id: string;

    @IsString()
    @IsOptional()
    text: string;

    @IsString()
    @IsOptional()
    notes: string;

    @IsString()
    @IsOptional()
    next: string;

    @IsString()
    @IsOptional()
    previous: string;

    @IsString()
    @IsOptional()
    dialogueTree: string;

    @IsString()
    @IsOptional()
    speaker: string;

    @IsOptional()
    @IsArray()
    @IsUUID('all', { each: true })
    choices: string[];
}