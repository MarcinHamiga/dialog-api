import {IsNumber, IsOptional, IsString, IsUUID} from "class-validator";

export class InputUpdateChoiceDto {
    @IsUUID()
    id: string;

    @IsUUID()
    @IsOptional()
    dialogue: string;

    @IsNumber()
    @IsOptional()
    position: number;

    @IsString()
    @IsOptional()
    text: string;

    @IsUUID()
    @IsOptional()
    next: string;
}