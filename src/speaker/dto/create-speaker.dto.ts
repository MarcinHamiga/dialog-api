import { IsString, IsUUID } from "class-validator";

export class CreateSpeakerDto {
  @IsString()
  name: string;
  
  @IsUUID()
  projectId: string;
}