import {IsNumber, IsOptional, IsString, IsUUID} from "class-validator";

export class InputCreateChoiceDto {
    @IsUUID()
    dialogue: string;

    @IsString()
    text: string;

    @IsUUID()
    @IsOptional()
    next: string;
}