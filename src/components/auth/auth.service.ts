import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

// plugins de terceros
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcryptjs';

import { RoleType } from '../role/roletype.enum';
import { User } from '../users/entities/user.entity';
import { IJwtPayload } from './data/jwt-payload.interface';

// dtos
import { SignInDto, SignUpDto } from './dto';

//repositories
import { AuthRepository } from './entities/auth.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private readonly _authRepository: AuthRepository,
    private readonly _jwtService: JwtService,
  ) {}

  signup = async (signUpDto: SignUpDto): Promise<void> => {
    const { username, email } = signUpDto;
    const userExist = await this._authRepository.findOne({
      where: [{ username }, { email }],
    });
    if (userExist) {
      throw new ConflictException('username or email already exist');
    }

    return this._authRepository.signup(signUpDto);
  };

  signin = async (signInDto: SignInDto): Promise<{ token: string }> => {
    const { username, password } = signInDto;

    const user: User = await this._authRepository.findOne({
      where: [{ username }, { password }],
    });
    if (!user) {
      throw new NotFoundException('user does not exist');
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('invalida credentials');
    }
    const payload: IJwtPayload = {
      id_user: user.pk_user,
      email: user.email,
      username: user.username,
      roles: user.roles.map((r) => r.name as RoleType), // casting role type with only name
    };

    const token = await this._jwtService.sign(payload);
    return { token };
  };
}
