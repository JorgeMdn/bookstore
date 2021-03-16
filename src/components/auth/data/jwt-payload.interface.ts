import { RoleType } from '../../role/roletype.enum';

export interface IJwtPayload {
  id_user: number;
  username: string;
  email: string;
  roles: RoleType[];
  iat?: Date;
}
