import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// modules
import { ConfigModule } from './@core/config/config.module';
import { SharedModule } from './@shared/shared.module';
import { CoreModule } from './@core/core.module';
import { ComponentsModule } from './components/components.module';

//controllers list
const MODULES = [CoreModule, SharedModule, ConfigModule, ComponentsModule];
//controllers list
const CONTROLLERS = [];

// providers list
const PROVIDERS = [];

@Module({
  imports: [...MODULES],
  controllers: [AppController, ...CONTROLLERS],
  providers: [AppService, ...PROVIDERS],
})
export class AppModule {}
