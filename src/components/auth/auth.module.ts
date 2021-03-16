import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

// controllers
import { AuthController } from './auth.controller';

// services
import { AuthService } from './auth.service';
import { ConfigService } from '../../@core/config/config.service';

// modules
import { ConfigModule } from '../../@core/config/config.module';

// strategies
import { JwtStrategy } from './strategies/jwt.strategy';

// repositories
import { AuthRepository } from './entities/auth.repository';

// configuration
import { Configuration } from '../../@core/config/config.keys';

const STRATEGIES = [JwtStrategy];
const MODULES = [];
const SERVICES = [ConfigService];
const CONTROLLERS = [];

@Module({
  imports: [
    ...MODULES,
    TypeOrmModule.forFeature([AuthRepository]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          secret: config.get(Configuration.JWT_SECRET),
          signOptions: {
            expiresIn: 3600,
          },
        };
      }, // al exportar nuestro modulo tenga lo que necesita
    }),
  ],
  controllers: [AuthController, ...CONTROLLERS],
  providers: [AuthService, ...SERVICES, ...STRATEGIES],
  exports: [...STRATEGIES, PassportModule],
})
export class AuthModule {}
