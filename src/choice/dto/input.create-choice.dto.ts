import {IsNumber, IsOptional, IsString, IsUUID} from "class-validator";

export class InputCreateChoiceDto {
    @IsUUID()
    dialogue: string;

    @IsNumber()
    position: number;

    @IsString()
    text: string;

    @IsUUID()
    @IsOptional()
    next: string;
}