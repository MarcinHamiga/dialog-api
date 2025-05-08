import {OutputGetDialogueTreeDto} from "./output.get-dialogue-tree.dto";
import {Expose} from "class-transformer";

export class OutputGetPaginatedDialogueTreeDto {
    @Expose()
    data: OutputGetDialogueTreeDto[];

    @Expose()
    total: number;

    @Expose()
    pages: number;
}