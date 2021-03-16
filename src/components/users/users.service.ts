import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// providers

// dtos

// entities
import { User } from './entities/user.entity';
import { UserRepository } from './entities/user.repository';
import { UserDetail } from './entities/user.detail.entity';
import { getConnection } from 'typeorm';
import { Role } from '../role/entities/role.entity';
import { RoleRepository } from '../role/entities/role.repository';
import { status } from '../../@shared/entities/entity-status.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository,
    @InjectRepository(RoleRepository)
    private readonly _roleRepository: RoleRepository,
  ) {}

  async create(user: User): Promise<User> {
    const details = new UserDetail();
    user.details = details;
    const repo = await getConnection().getRepository(Role);
    const defaulRole = await repo.findOne({ where: { name: 'GENERAL' } });
    user.roles = [defaulRole];
    const savedUser: User = await this._userRepository.save(user);
    return savedUser;
  }

  async findAll(): Promise<User[]> {
    const users: User[] = await this._userRepository.find({
      where: { status: status.ACTIVE },
    });

    if (!users) throw new NotFoundException();

    return users;
  }

  async findOne(id: number): Promise<User> {
    if (!id) throw new BadRequestException('id must be sent');
    const user: User = await this._userRepository.findOne(id, {
      where: { status: status.ACTIVE },
    });

    if (!user) throw new NotFoundException();

    return user;
  }

  async update(id: number, user: User): Promise<void> {
    await this._userRepository.update(id, user);
  }

  async remove(id: number): Promise<void> {
    const userExist = await this._userRepository.findOne(id, {
      where: { status: status.ACTIVE },
    });

    if (!userExist) {
      throw new NotFoundException();
    }
    await this._userRepository.update(id, { status: 0 });
  }

  async setRoleToUser(userId: number, roleId: number) {
    const userExist = await this._userRepository.findOne(userId, {
      where: { status: status.ACTIVE },
    });

    if (!userExist) {
      throw new NotFoundException('user not exist');
    }

    const roleExist = await this._roleRepository.findOne(roleId, {
      where: { status: status.ACTIVE },
    });

    if (!roleExist) {
      throw new NotFoundException('role does not exist');
    }

    userExist.roles.push(roleExist);
    await this._userRepository.save(userExist);
    return true;
  }
}
