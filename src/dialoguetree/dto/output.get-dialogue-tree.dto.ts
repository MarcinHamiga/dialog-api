import {Expose} from "class-transformer";

export class  OutputGetDialogueTreeDto {
    @Expose()
    id: string;

    @Expose()
    treeName: string;

    @Expose()
    treeId: string;

    @Expose()
    createdAt: string;

    @Expose()
    updatedAt: string;
}