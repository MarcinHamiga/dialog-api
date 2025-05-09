import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {ChoiceService} from "./choice.service";
import {OutputChoiceDto} from "./dto/output.choice.dto";
import {InputCreateChoiceDto} from "./dto/input.create-choice.dto";
import {InputUpdateChoiceDto} from "./dto/input.update-choice.dto";

@Controller('choice')
export class ChoiceController {
    constructor(private readonly choiceService: ChoiceService) {}

    @Get()
    findAll(): Promise<OutputChoiceDto[]> {
        return this.choiceService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: string): Promise<OutputChoiceDto> {
        return this.choiceService.findOne(id);
    }

    @Get('/dialogue/:id')
    findByDialogue(
        @Param('id') id: string,
    ): Promise<OutputChoiceDto[]> {
        return this.choiceService.findAllByDialogue(id);
    }

    @Post()
    create(@Body() dto: InputCreateChoiceDto): Promise<OutputChoiceDto> {
        return this.choiceService.create(dto);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() dto: InputUpdateChoiceDto,
    ): Promise<OutputChoiceDto> {
        return this.choiceService.update(id, dto)
    }

    @Delete(':id')
    delete(
        @Param('id') id: string
    ): Promise<void> {
        return this.choiceService.delete(id);
    }
}
