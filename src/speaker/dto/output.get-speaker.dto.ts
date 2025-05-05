import {IsDateString, IsOptional, IsString, IsUUID} from "class-validator";

export class OutputGetSpeakerDto {
    @IsUUID()
    id: string;

    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    image?: string;

    @IsDateString()
    createdAt: string;

    @IsDateString()
    updatedAt: string;

    @IsUUID()
    project: string;
}