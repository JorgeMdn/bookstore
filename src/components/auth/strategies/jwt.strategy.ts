import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import { Configuration } from '../../../@core/config/config.keys';
import { ConfigService } from '../../../@core/config/config.service';
import { IJwtPayload } from '../data/jwt-payload.interface';
import { AuthRepository } from '../entities/auth.repository';

/**
 *  nuestra strategy es un servicio y tenemos que inyectarlo para que
 * nuestro modulo lo reconosca como servicio necesitamos agregar el decorador inyectable
 *
 *  */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly _configService: ConfigService,
    @InjectRepository(AuthRepository)
    private readonly _authRepository: AuthRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: _configService.get(Configuration.JWT_SECRET),
    });
  }

  validate = async (payload: IJwtPayload) => {
    const { username } = payload;
    const user = await this._authRepository.findOne({
      where: { username, status: 1 },
    });

    if (!user) {
      throw new UnauthorizedException();
    }
    return payload;
  };
}
