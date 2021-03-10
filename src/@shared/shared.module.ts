import { Module } from '@nestjs/common';

//controllers list
const MODULES = [];

// providers list
const PROVIDERS = [];
// providers list
const EXPORTS = [];

@Module({
  imports: [...MODULES],
  providers: [...PROVIDERS],
  exports: [...EXPORTS],
})
@Module({})
export class SharedModule {}
