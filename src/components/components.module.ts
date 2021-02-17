import { Module } from '@nestjs/common';

// modules
import { UsersModule } from './users/users.module';
import { RoleModule } from './role/role.module';

//controllers list
const MODULES = [UsersModule, RoleModule];

// providers list
const PROVIDERS = [];
// providers list
const EXPORTS = [];

@Module({
  imports: [...MODULES],
})
export class ComponentsModule {}
