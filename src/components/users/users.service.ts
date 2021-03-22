import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { getConnection } from 'typeorm';

// providers
import { status } from '../../@shared/entities/entity-status.enum';

// dtos
import { ReadUserDto, UpdateUserDto } from './dto';

// entities
import { User } from './entities/user.entity';
import { UserRepository } from './entities/user.repository';
import { UserDetail } from './entities/user.detail.entity';
import { Role } from '../role/entities/role.entity';
import { RoleRepository } from '../role/entities/role.repository';

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

  async findAll(): Promise<ReadUserDto[]> {
    const users: User[] = await this._userRepository.find({
      where: { status: status.ACTIVE },
    });

    if (!users) throw new NotFoundException();

    return users.map((user: User) => plainToClass(ReadUserDto,user));
  }

  async findOne(id: number): Promise<ReadUserDto> {
    if (!id) throw new BadRequestException('id must be sent');
    const user: User = await this._userRepository.findOne(id, {
      where: { status: status.ACTIVE },
    });

    if (!user) throw new NotFoundException();

    return plainToClass(ReadUserDto,user)
  }

  async update(userId: number, user: Partial<UpdateUserDto>): Promise<ReadUserDto> {
    const foundUser = await this._userRepository.findOne(userId,{where: {status: status.ACTIVE}});
    if (!foundUser) {
      throw new NotFoundException('This user does not exist.')
    }
    foundUser.email = user.username
    const updatedUser = await this._userRepository.save(foundUser)
    return plainToClass(ReadUserDto,updatedUser)
  }

  async remove(userId: number): Promise<void> {
    const userExist = await this._userRepository.findOne(userId, {
      where: { status: status.ACTIVE },
    });

    if (!userExist) {
      throw new NotFoundException();
    }
    await this._userRepository.update(userId, { status: 0 });
  }

  async setRoleToUser(userId: number, roleId: number): Promise<boolean> {
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
