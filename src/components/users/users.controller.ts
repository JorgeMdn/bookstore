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
import { Roles } from '../role/decorators/role.decorator';
import { RoleGuard } from '../role/guards/role.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly _userService: UsersService) {}

  @Post()
  create(@Body() user: User): Promise<User> {
    return this._userService.create(user);
  }

  @UseGuards(AuthGuard())
  @Get()
  findAll(): Promise<User[]> {
    return this._userService.findAll();
  }

  @Get(':id')
  @Roles('ADMINI')
  @UseGuards(AuthGuard(),RoleGuard)
  findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this._userService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: User,
  ): Promise<void> {
    return this._userService.update(+id, user);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    this._userService.remove(+id);
    return true;
  }

  @Post('setRole/:userId/:roleId')
  async setRoleToUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('roleId', ParseIntPipe) roleId: number,
  ) {
    return await this._userService.setRoleToUser(userId, roleId);
  }
}
