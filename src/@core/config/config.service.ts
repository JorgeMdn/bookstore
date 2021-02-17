import * as fs from 'fs';
import { parse } from 'dotenv';
export class ConfigService {
  private readonly config: { [key: string]: string };

  constructor() {
    const isDeveopmentEnv = process.env.NODE_ENV !== 'prod';

    if (isDeveopmentEnv) {
      const envFilePath = __dirname + '/../../../.env';
      console.log('__dirname', __dirname);

      const existPath = fs.existsSync(envFilePath);
      if (!existPath) {
        console.error('.env file does not exist');
        process.exit(0);
      }
      this.config = parse(fs.readFileSync(envFilePath));
    } else {
      this.config = {
        PORT: process.env.PORT,
      };
    }
  }

  get = (key: string): string => {
    return this.config[key];
  };
}
