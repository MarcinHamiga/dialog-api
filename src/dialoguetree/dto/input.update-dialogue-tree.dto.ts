import {IsOptional, IsString, IsUUID} from "class-validator";

export class InputUpdateDialogueTreeDto {
    @IsUUID()
    id: string;

    @IsUUID()
    projectId: string;

    @IsString()
    @IsOptional()
    treeId: string;

    @IsString()
    @IsOptional()
    treeName: string;
}