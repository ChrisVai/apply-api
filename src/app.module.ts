import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CanvassingsModule } from './canvassings/canvassings.module';

@Module({
  imports: [UsersModule, CanvassingsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
