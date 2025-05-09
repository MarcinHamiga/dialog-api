import {Expose} from "class-transformer";
import {OutputChoiceDto} from "./output.choice.dto";

export class OutputChoicePaginatedDto {
    @Expose()
    data: OutputChoiceDto[];

    @Expose()
    total: number;

    @Expose()
    pages: number;
}