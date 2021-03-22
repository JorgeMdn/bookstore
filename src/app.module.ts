import { Module } from '@nestjs/common';

// modules
import { ConfigModule } from './@core/config/config.module';
import { CoreModule } from './@core/core.module';
import { ComponentsModule } from './components/components.module';

// config
import { Configuration } from './@core/config/config.keys';
import { ConfigService } from './@core/config/config.service';

//controllers list
const MODULES = [CoreModule, ConfigModule, ComponentsModule];
//controllers list
const CONTROLLERS = [];

// providers list
const PROVIDERS = [];

@Module({
  imports: [...MODULES],
  controllers: [...CONTROLLERS],
  providers: [...PROVIDERS],
})
export class AppModule {
  static port: number | string;
  constructor(private readonly _configService: ConfigService) {
    AppModule.port = this._configService.get(Configuration.PORT);
  }
}
