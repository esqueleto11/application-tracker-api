import 'dotenv/config';
import { DataSource } from 'typeorm';
import { getTypeOrmConnectionOptions } from '../config/typeorm-connection.config';

export default new DataSource({
  ...getTypeOrmConnectionOptions(),
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
});
