import { Controller, Get, Inject, Param, ParseUUIDPipe } from "@nestjs/common";
import { SpeakerService } from "./speaker.service";

@Controller("speaker")
export class SpeakerController {
  constructor(private readonly speakerService: SpeakerService) {}

  // @Get("/project/:id")
  // findAllByProject(
  //   @Param('id', ParseUUIDPipe)
  // ) {

  // }
}
