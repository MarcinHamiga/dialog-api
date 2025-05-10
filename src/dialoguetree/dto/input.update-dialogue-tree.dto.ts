import {IsOptional, IsString, IsUUID} from "class-validator";

export class InputUpdateDialogueTreeDto {
    @IsUUID()
    projectId: string;

    @IsString()
    @IsOptional()
    treeId: string;

    @IsString()
    @IsOptional()
    treeName: string;
}