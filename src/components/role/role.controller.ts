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
import { ReadRoleDto, UpdateRoleDto } from './dto';

@Controller('roles')
export class RoleController {
  constructor(private readonly rolesService: RoleService) {}

  @Post()
  async create(@Body() role: Partial<Role>): Promise<ReadRoleDto> {
    return await this.rolesService.create(role);
  }

  @Get()
  findAll(): Promise<ReadRoleDto[]> {
    return this.rolesService.findAll();
  }

  @Get(':roleId')
  findOne(@Param('roleId', ParseIntPipe) roleId: string): Promise<ReadRoleDto> {
    return this.rolesService.findOne(+roleId);
  }

  @Put(':roleId')
  update(
    @Param('roleId', ParseIntPipe) roleId: string,
    @Body() role: Partial<UpdateRoleDto>,
  ): Promise<ReadRoleDto> {
    return this.rolesService.update(+roleId, role);
  }

  @Delete(':roleId')
  remove(@Param('roleId', ParseIntPipe) roleId: string) {
    this.rolesService.remove(+roleId);
    return true;
  }
}
