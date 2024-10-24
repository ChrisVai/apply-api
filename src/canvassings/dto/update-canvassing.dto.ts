import { PartialType } from '@nestjs/mapped-types';
import { CreateCanvassingDto } from './create-canvassing.dto';

export class UpdateCanvassingDto extends PartialType(CreateCanvassingDto) {}
