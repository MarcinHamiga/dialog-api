import {IsOptional, IsString} from "class-validator";

export class InputCreateDialogueDto {
    @IsString()
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
    dialogueTree: string;

    @IsString()
    @IsOptional()
    speaker: string;
}