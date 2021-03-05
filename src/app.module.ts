import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// modules
import { ConfigModule } from './@core/config/config.module';
import { SharedModule } from './@shared/shared.module';
import { CoreModule } from './@core/core.module';
import { ComponentsModule } from './components/components.module';
import { Configuration } from './@core/config/config.keys';
import { ConfigService } from './@core/config/config.service';

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
export class AppModule {
  static port: number | string;
  constructor(private readonly _configService: ConfigService) {
    AppModule.port = this._configService.get(Configuration.PORT);
  }
}
