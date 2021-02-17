import { Injectable } from '@nestjs/common';
import { UserDto } from '../../components/users/dto/user.dto';
import { User } from '../../components/users/entities/user.entity';
import { TypeMapper } from 'ts-mapper';

@Injectable()
export class MapperService extends TypeMapper {
  constructor() {
    super(); //llamamos al constructor de typemapper
    this.config();
  }

  private config = (): void => {
    this.createMap<User, UserDto>()
      .map(
        (entity) => entity.pk_user,
        (dto) => dto.id,
      )
      .map(
        (entity) => entity.username,
        (dto) => dto.username,
      )
      .map(
        (entity) => entity.email,
        (dto) => dto.email,
      )
      .map(
        (entity) => entity.details,
        (dto) => dto.details,
      )
      .map(
        (entity) => entity.roles,
        (dto) => dto.roles,
      );
  };
}
