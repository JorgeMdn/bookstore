import { Module } from '@nestjs/common';

// modules
import { UsersModule } from './users/users.module';
import { RoleModule } from './role/role.module';

//modules list
const MODULES = [UsersModule, RoleModule];

// providers list
const PROVIDERS = [];
// exports list
const EXPORTS = [...MODULES];

@Module({
  imports: [...MODULES],
  exports: [...EXPORTS],
})
export class ComponentsModule {}
