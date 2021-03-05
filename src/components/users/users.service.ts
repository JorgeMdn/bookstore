import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// providers
import { MapperService } from '../../@shared/providers/mapper.service';

// dtos
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// entities
import { User } from './entities/user.entity';
import { UserRepository } from './entities/user.repository';
import { UserDetail } from './entities/user.detail.entity';
import { getConnection } from 'typeorm';
import { Role } from '../role/entities/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository,
    private readonly _mapperService: MapperService,
  ) {}
  async create(user: User): Promise<UserDto> {
    const details = new UserDetail();
    user.details = details;
    const repo = await getConnection().getRepository(Role);
    const defaulRole = await repo.findOne({ where: { name: 'GENERAL' } });
    user.roles = [defaulRole];
    const savedUser: User = await this._userRepository.save(user);
    return this._mapperService.map<User, UserDto>(savedUser, new UserDto());
  }

  async findAll(): Promise<User[]> {
    const users: User[] = await this._userRepository.find({
      where: { status: 1 },
    });

    if (!users) throw new NotFoundException();

    return this._mapperService.mapCollection<User, UserDto>(
      users,
      new UserDto(),
    );
  }

  async findOne(id: number): Promise<UserDto> {
    if (!id) throw new BadRequestException('id must be sent');
    const user: User = await this._userRepository.findOne(id, {
      where: { status: 1 },
    });

    if (!user) throw new NotFoundException();

    return this._mapperService.map<User, UserDto>(user, new UserDto());
  }

  async update(id: number, user: User): Promise<void> {
    await this._userRepository.update(id, user);
    //return this._mapperService.map<User, UserDto>(user, new UserDto());
  }

  async remove(id: number): Promise<void> {
    const userExist = await this._userRepository.findOne(id, {
      where: { status: 1 },
    });

    if (!userExist) {
      throw new NotFoundException();
    }
    await this._userRepository.update(id, { status: 0 });
  }
}
