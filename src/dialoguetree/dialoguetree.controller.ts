import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query} from '@nestjs/common';
import {DialoguetreeService} from "./dialoguetree.service";
import {OutputGetPaginatedDialogueTreeDto} from "./dto/output.get-paginated-dialogue-tree.dto";
import {InputCreateDialogueTreeDto} from "./dto/input.create-dialogue-tree.dto";
import {InputUpdateDialogueTreeDto} from "./dto/input.update-dialogue-tree.dto";
import {OutputGetDialogueTreeDto} from "./dto/output.get-dialogue-tree.dto";

@Controller('dialoguetree')
export class DialoguetreeController {
    constructor(private readonly dialoguetreeService: DialoguetreeService) {}

    @Get()
    findAll(
        @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
        @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    ) {
        return this.dialoguetreeService.findAll(limit, page);
    }

    @Get(":id")
    findOne(
        @Param('id') id: string,
    ): Promise<OutputGetDialogueTreeDto> {
        return this.dialoguetreeService.findOne(id);
    }

    @Get('/project/:projectId')
    findByProject(
        @Param('projectId')  projectId: string,
        @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
        @Query('page', new ParseIntPipe({ optional: true })) page?: number,
        @Query('order') order?: "ASC" | "DESC" | "asc" | "desc",
    ): Promise<OutputGetPaginatedDialogueTreeDto> {
        return this.dialoguetreeService.findByProject(projectId, limit, page, order);
    }

    @Post()
    create(@Body() dto: InputCreateDialogueTreeDto): Promise<OutputGetDialogueTreeDto> {
        return this.dialoguetreeService.create(dto);
    }

    @Patch()
    update(@Body() dto: InputUpdateDialogueTreeDto): Promise<OutputGetDialogueTreeDto> {
        return this.dialoguetreeService.update(dto)
    }

    @Delete(':id')
    delete(
        @Param('id') id: string,
    ): Promise<void> {
        return this.dialoguetreeService.delete(id);
    }

}
