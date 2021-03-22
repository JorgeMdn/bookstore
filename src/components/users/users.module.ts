import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UserRepository } from './entities/user.repository';

// modules
import { AuthModule } from '../auth/auth.module';
import { RoleRepository } from '../role/entities/role.repository';

const MODULES = [AuthModule];

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    TypeOrmModule.forFeature([UserRepository, RoleRepository]),
    ...MODULES,
  ],
})
export class UsersModule {}
