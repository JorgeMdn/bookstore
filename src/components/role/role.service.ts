import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

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
  async create(role: Role): Promise<Role> {
    const savedRole: Role = await this._roleRepository.save(role);
    return savedRole;
  }

  async findAll(): Promise<Role[]> {
    const roles: Role[] = await this._roleRepository.find({
      where: { status: 1 },
    });

    if (!roles) throw new NotFoundException();

    return roles;
  }

  async findOne(id: number): Promise<Role> {
    if (!id) throw new BadRequestException('id must be sent');
    const role: Role = await this._roleRepository.findOne(id, {
      where: { status: 1 },
    });

    if (!role) throw new NotFoundException();

    return role;
  }

  async update(id: number, role: Role): Promise<void> {
    await this._roleRepository.update(id, role);
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
