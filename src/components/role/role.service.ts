import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { status } from '../../@shared/entities/entity-status.enum';
import { CreateRoleDto, ReadRoleDto, UpdateRoleDto } from './dto';

// dtos

// entities
import { Role } from './entities/role.entity';
import { RoleRepository } from './entities/role.repository';

@Injectable() 
export class RoleService {
  constructor(
    @InjectRepository(RoleRepository)
    private readonly _roleRepository: RoleRepository,
  ) {}
  async create(role: Partial<CreateRoleDto>): Promise<ReadRoleDto> {
    const savedRole: Role = await this._roleRepository.save(role);
    return plainToClass(ReadRoleDto, savedRole);
  }

  async findAll(): Promise<ReadRoleDto[]> {
    const roles: Role[] = await this._roleRepository.find({
      where: { status: 1 },
    });

    if (!roles) throw new NotFoundException();

    return roles.map((role:Role) => plainToClass(ReadRoleDto, role));
  }

  async findOne(id: number): Promise<ReadRoleDto> {
    if (!id) throw new BadRequestException('id must be sent');
    const role: Role = await this._roleRepository.findOne(id, {
      where: { status: 1 },
    });

    if (!role) throw new NotFoundException();

    return plainToClass(ReadRoleDto, role);
  }

  async update(roleId: number, role: Partial<UpdateRoleDto>): Promise<ReadRoleDto> {
    let foundRole = await this._roleRepository.findOne(roleId, {where: {status: status.ACTIVE}})
    if (!foundRole) {
      throw new NotFoundException('This role does not exist')
    }
    foundRole.name = role.name
    foundRole.description = role.description
    let updatedRole = await this._roleRepository.save(foundRole);
    return plainToClass(ReadRoleDto, updatedRole);
  }

  async remove(id: number): Promise<void> {
    const roleExist = await this._roleRepository.findOne(id, {
      where: { status: 1 },
    });

    if (!roleExist) {
      throw new NotFoundException();
    }
    await this._roleRepository.update(id, { status: 0 });
  }
}
