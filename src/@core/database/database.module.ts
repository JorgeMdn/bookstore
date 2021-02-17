import { Module } from '@nestjs/common';

// providers
import { databaseProviders } from './database.service';

@Module({
  imports: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
