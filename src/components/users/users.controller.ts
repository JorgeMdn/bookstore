import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { ReadUserDto } from './dto';

@Controller('users')
export class UsersController {
  constructor(private readonly _userService: UsersService) {}

  @Post()
  create(@Body() user: User): Promise<User> {
    return this._userService.create(user);
  }

  @UseGuards(AuthGuard())
  @Get()
  findAll(): Promise<ReadUserDto[]> {
    return this._userService.findAll();
  }

  @Get(':userId')
  //@Roles(RoleType.ADMIN)
  //@UseGuards(AuthGuard(),RoleGuard)
  findOne(@Param('userId', ParseIntPipe) id: number): Promise<ReadUserDto > {
    return this._userService.findOne(+id);
  }

  @Put(':userId')
  update(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() user: User,
  ): Promise<ReadUserDto> {
    return this._userService.update(+userId, user);
  }

  @Delete(':userId')
  remove(@Param('userId', ParseIntPipe) userId: number):Promise<void> {
    return this._userService.remove(+userId);
    
  }

  @Post('setRole/:userId/:roleId')
  async setRoleToUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('roleId', ParseIntPipe) roleId: number,
  ): Promise<boolean> {
    return await this._userService.setRoleToUser(userId, roleId);
  }
}
