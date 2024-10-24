import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CanvassingsService } from './canvassings.service';
import { CreateCanvassingDto } from './dto/create-canvassing.dto';
import { UpdateCanvassingDto } from './dto/update-canvassing.dto';

@Controller('canvassings')
export class CanvassingsController {
  constructor(private readonly canvassingsService: CanvassingsService) {}

  @Post()
  create(@Body() createCanvassingDto: CreateCanvassingDto) {
    return this.canvassingsService.create(createCanvassingDto);
  }

  @Get()
  findAll() {
    return this.canvassingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.canvassingsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCanvassingDto: UpdateCanvassingDto) {
    return this.canvassingsService.update(+id, updateCanvassingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.canvassingsService.remove(+id);
  }
}
