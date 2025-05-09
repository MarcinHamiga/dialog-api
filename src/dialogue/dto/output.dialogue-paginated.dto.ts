import {Expose} from "class-transformer";
import {OutputDialogueDto} from "./output.dialogue.dto";

export class OutputDialoguePaginatedDto {
    @Expose()
    data: OutputDialogueDto[];

    @Expose()
    total: number;

    @Expose()
    pages: number;
}