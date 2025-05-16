import {IsOptional, IsString, IsUUID} from "class-validator";

export class InputUpdateDialogueTreeDto {
    @IsString()
    @IsOptional()
    treeId: string;

    @IsString()
    @IsOptional()
    treeName: string;
}