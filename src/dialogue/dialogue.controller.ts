import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query} from '@nestjs/common';
import {DialogueService} from "./dialogue.service";
import {OutputDialogueDto} from "./dto/output.dialogue.dto";
import {OutputDialoguePaginatedDto} from "./dto/output.dialogue-paginated.dto";
import {InputCreateDialogueDto} from "./dto/input.create-dialogue.dto";
import {InputUpdateDialogueDto} from "./dto/input.update-dialogue.dto";

@Controller('dialogue')
export class DialogueController {

    constructor(
       private readonly dialogueService: DialogueService,
    ) {}

    @Get()
    findAll(): Promise<OutputDialogueDto[]> {
        return this.dialogueService.findAll();
    }

    @Get('/dialogueTree/:id')
    findByTreeId(
        @Param('id')id: string,
        @Query('limit',  new ParseIntPipe({ optional: true })) limit?: number,
        @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    ): Promise<OutputDialoguePaginatedDto> {
        return this.dialogueService.findAllByDialogueTree(id, limit, page);
    }

    @Get('/:id')
    find(@Param('id') id: string): Promise<OutputDialogueDto> {
        return this.dialogueService.find(id);
    }

    @Post()
    create(
        @Body() dto: InputCreateDialogueDto,
    ) {
        return this.dialogueService.create(dto);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() dto: InputUpdateDialogueDto,
    ) {
        return this.dialogueService.update(id, dto);
    }

    @Delete(':id')
    delete(
        @Param('id') id: string,
    ) {
        return this.dialogueService.delete(id);
    }
 }
