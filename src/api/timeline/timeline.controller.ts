import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TimelineService } from './timeline.service';
import { CreateTimelineDto } from './dto/create-timeline.dto';
import { UpdateTimelineDto } from './dto/update-timeline.dto';

@Controller('timeline')
export class TimelineController {
  constructor(private readonly timelineService: TimelineService) {}

  @Post()
  create(@Body() createTimelineDto: CreateTimelineDto) {
    return this.timelineService.create(createTimelineDto);
  }

  @Get()
  find(@Query() query) {
    return this.timelineService.find();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.timelineService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTimelineDto: UpdateTimelineDto,
  ) {
    return this.timelineService.update(+id, updateTimelineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timelineService.remove(+id);
  }
}
