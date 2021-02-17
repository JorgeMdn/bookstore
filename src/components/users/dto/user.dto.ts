import { IsNotEmpty } from 'class-validator';
import { RoleType } from '../../role/roletype.enum';
import { UserDetail } from '../entities/user.detail.entity';
export class UserDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  roles: RoleType[];

  @IsNotEmpty()
  details: UserDetail;
}
