import {IsString, IsUUID} from "class-validator";

export class InputCreateDialogueTreeDto {
    @IsUUID()
    projectId: string;

    @IsString()
    treeName: string;

    @IsString()
    treeId: string;
}