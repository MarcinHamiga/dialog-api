import {Expose} from "class-transformer";

export class OutputGetSpeakerDto {
    @Expose()
    id: string;

    @Expose()
    name: string;

    @Expose()
    image?: string;

    @Expose()
    createdAt: string;

    @Expose()
    updatedAt: string;

    @Expose()
    project: string;
}