import { RoleRepository } from '../../role/entities/role.repository';
import { EntityRepository, getConnection, Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { SignUpDto } from '../dto';
import { Role } from '../../role/entities/role.entity';
import { RoleType } from '../../role/roletype.enum';
import { UserDetail } from '../../users/entities/user.detail.entity';
import { genSalt, getSalt, hash } from 'bcryptjs';

@EntityRepository(User)
export class AuthRepository extends Repository<User> {
  signup = async (signUpDto: SignUpDto) => {
    const { username, email, password } = signUpDto;
    const user = new User();
    user.username = username;
    user.email = email;
    user.password = password;

    const roleRepository: RoleRepository = await getConnection().getRepository(
      Role,
    );

    const defaultRole: Role = await roleRepository.findOne({
      where: { name: RoleType.GENERAL },
    });

    user.roles = [defaultRole];

    const details = new UserDetail();
    user.details = details;

    const salt = await genSalt(10);
    user.password = await hash(password, salt);
    await user.save();
  };
}
