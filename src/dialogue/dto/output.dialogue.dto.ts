import {Expose, Type} from "class-transformer";
import {OutputChoiceDto} from "../../choice/dto/output.choice.dto";

export class OutputDialogueDto {
    @Expose()
    id: string;

    @Expose()
    text: string;

    @Expose()
    notes: string;

    @Expose()
    createdAt: string;

    @Expose()
    updatedAt: string;

    @Expose()
    speaker: string;

    @Expose()
    @Type(() => OutputChoiceDto)
    choices: OutputChoiceDto[];

    @Expose()
    position: number;
}