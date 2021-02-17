import { Module } from '@nestjs/common';
import { MapperService } from './providers/mapper.service';

//controllers list
const MODULES = [];

// providers list
const PROVIDERS = [MapperService];
// providers list
const EXPORTS = [MapperService];

@Module({
  imports: [...MODULES],
  providers: [...PROVIDERS],
  exports: [...EXPORTS],
})
@Module({})
export class SharedModule {}
