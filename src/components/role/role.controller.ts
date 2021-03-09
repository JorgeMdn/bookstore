import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from './entities/role.entity';

@Controller('roles')
export class RoleController {
  constructor(private readonly rolesService: RoleService) {}

  @Post()
  async create(@Body() role: Role): Promise<Role> {
    return await this.rolesService.create(role);
  }

  @Get()
  findAll(): Promise<Role[]> {
    return this.rolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string): Promise<Role> {
    return this.rolesService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() role: Role,
  ): Promise<void> {
    return this.rolesService.update(+id, role);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    this.rolesService.remove(+id);
    return true;
  }
}
