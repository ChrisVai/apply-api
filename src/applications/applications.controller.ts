import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
} from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { UsersService } from '../users/users.service';
import { UserModel } from '../users/model/userModel';

@Controller('applications')
export class ApplicationsController {
  constructor(
    private readonly applicationService: ApplicationsService,
    private readonly userService: UsersService,
  ) {}

  @Post()
  create(@Body() createApplicationDto: CreateApplicationDto) {
    console.log('passage dans Create Application', createApplicationDto);
    return this.applicationService.create(createApplicationDto);
  }

  @Get()
  findAll() {
    return this.applicationService.findAll();
  }

  @Get('me/:userId') async getUserApplicationsByUserId(
    @Param('userId') userId: string,
  ) {
    const user: UserModel = await this.userService.findOne(parseInt(userId));
    if (user !== null) {
      return this.applicationService.findUserApplications(user);
    }
    throw new HttpException("This user doesn't exist", 404);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.applicationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateApplicationDto: UpdateApplicationDto,
  ) {
    return this.applicationService.update(+id, updateApplicationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.applicationService.remove(+id);
  }
}
