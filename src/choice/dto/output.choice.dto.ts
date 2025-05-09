import {Expose} from "class-transformer";

export class OutputChoiceDto {
    @Expose()
    id: string;

    @Expose()
    text: string;

    @Expose()
    position: number;

    @Expose()
    createdAt: string;

    @Expose()
    updatedAt: string;
}