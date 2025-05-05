import { IsString, IsUUID } from "class-validator";

export class InputCreateSpeakerDto {
  @IsString()
  name: string;
  
  @IsUUID()
  projectId: string;
}