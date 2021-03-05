import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions, createConnection } from 'typeorm';

// configuration
import { Configuration } from '../config/config.keys';

// modules
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';

export const databaseProviders = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    async useFactory(config: ConfigService) {
      return {
        ssl: false,
        type: 'postgres' as 'postgres',
        host: config.get(Configuration.POSTGRES_HOST),
        port: parseInt(config.get(Configuration.POSTGRES_PORT)),
        username: config.get(Configuration.POSTGRES_USERNAME),
        password: config.get(Configuration.POSTGRES_PASSWORD),
        database: config.get(Configuration.POSTGRES_DATABASE),
        entities: [__dirname + '/../../components/**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
        synchronize: true,
      } as ConnectionOptions;
    },
  }),
];

// export const databaseProviders = [
//   {
//     provide: 'DATABASE_CONNECTION',
//     useFactory: async (config: ConfigService) =>
//       createConnection({
//         type: 'postgres' as 'postgres',
//         host: config.get(Configuration.POSTGRES_HOST),
//         port: parseInt(config.get(Configuration.POSTGRES_PORT)),
//         username: config.get(Configuration.POSTGRES_USERNAME),
//         password: config.get(Configuration.POSTGRES_PASSWORD),
//         database: config.get(Configuration.POSTGRES_DATABASE),
//         entities: [__dirname + '/../**/*.entity{.ts,.js}'],
//         migrations: [__dirname + '/migrations/*{.ts,.js}'],
//       }),
//   },
// ];
