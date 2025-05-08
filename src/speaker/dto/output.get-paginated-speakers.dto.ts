import {Speaker} from "../entities/speaker.entity";
import {Expose} from "class-transformer";

export class OutputGetPaginatedSpeakerDto {
    @Expose()
    data: Speaker[]

    @Expose()
    total: number;

    @Expose()
    pages: number;
}