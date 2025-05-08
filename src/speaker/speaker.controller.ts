import {Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, Query} from "@nestjs/common";
import { SpeakerService } from "./speaker.service";
import {InputCreateSpeakerDto} from "./dto/input.create-speaker.dto";
import {OutputGetSpeakerDto} from "./dto/output.get-speaker.dto";
import {InputUpdateSpeakerDto} from "./dto/input.update-speaker.dto";
import {OutputGetPaginatedSpeakerDto} from "./dto/output.get-paginated-speakers.dto";

@Controller("speaker")
export class SpeakerController {
  constructor(private readonly speakerService: SpeakerService) {}

  @Get("/project/:id")
  findAllByProject(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('order') order?: "ASC" | "DESC" | "asc" | "desc",
  ): Promise<OutputGetPaginatedSpeakerDto> {
    console.log("Limit: ", limit);
    console.log("Order: ", order);
    return this.speakerService.findAll(id, limit, page, order)
  }

  @Get("/:id")
  findById(@Param('id') id: string): Promise<OutputGetSpeakerDto> {
    return this.speakerService.findOne(id);
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
