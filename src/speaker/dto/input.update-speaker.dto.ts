import { PartialType } from "@nestjs/mapped-types";
import { InputCreateSpeakerDto } from "./input.create-speaker.dto";

export class InputUpdateSpeakerDto extends PartialType(InputCreateSpeakerDto) {}