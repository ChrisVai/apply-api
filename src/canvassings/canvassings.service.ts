import { Injectable } from '@nestjs/common';
import { CreateCanvassingDto } from './dto/create-canvassing.dto';
import { UpdateCanvassingDto } from './dto/update-canvassing.dto';

@Injectable()
export class CanvassingsService {
  create(createCanvassingDto: CreateCanvassingDto) {
    return 'This action adds a new canvassing';
  }

  findAll() {
    return `This action returns all canvassings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} canvassing`;
  }

  update(id: number, updateCanvassingDto: UpdateCanvassingDto) {
    return `This action updates a #${id} canvassing`;
  }

  remove(id: number) {
    return `This action removes a #${id} canvassing`;
  }
}
