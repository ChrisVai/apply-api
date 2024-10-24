import { Module } from '@nestjs/common';
import { CanvassingsService } from './canvassings.service';
import { CanvassingsController } from './canvassings.controller';

@Module({
  controllers: [CanvassingsController],
  providers: [CanvassingsService],
})
export class CanvassingsModule {}
