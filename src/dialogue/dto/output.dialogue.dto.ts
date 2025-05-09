import {Expose} from "class-transformer";

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
    choices: string[];

    @Expose()
    nextPosition: number;

    @Expose()
    previousPosition: number;
}