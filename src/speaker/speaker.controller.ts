import {Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post} from "@nestjs/common";
import { SpeakerService } from "./speaker.service";
import {InputCreateSpeakerDto} from "./dto/input.create-speaker.dto";
import {OutputGetSpeakerDto} from "./dto/output.get-speaker.dto";
import {InputUpdateSpeakerDto} from "./dto/input.update-speaker.dto";

@Controller("speaker")
export class SpeakerController {
  constructor(private readonly speakerService: SpeakerService) {}

  @Get("/project/:id")
  findAllByProject(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<OutputGetSpeakerDto[]> {
    return this.speakerService.findAll(id)
  }

  @Get("/:id")
  findById(@Param('id') id: string): Promise<OutputGetSpeakerDto> {
    return this.speakerService.findOne(id);
  }

  @Get()
  findAll(): Promise<OutputGetSpeakerDto[]> {
    return this.speakerService.findAll();
  }

  @Post()
  create(@Body() createSpeakerDto: InputCreateSpeakerDto) {
    return this.speakerService.create(createSpeakerDto);
  }

  @Patch("/:id")
  update(
      @Param('id', ParseUUIDPipe) id: string,
      @Body() updateSpeakerDto: InputUpdateSpeakerDto
  ): Promise<OutputGetSpeakerDto> {
    return this.speakerService.update(id, updateSpeakerDto);
  }

  @Delete("/:id")
  remove(
      @Param('id', ParseUUIDPipe) id: string
  ): Promise<void> {
    return this.speakerService.remove(id);
  }

}
