import type { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

/**
 * Connection settings shared by Nest (`TypeOrmModule`) and the TypeORM CLI (`data-source.ts`).
 * Nest loads `.env` via `ConfigModule.forRoot()`; the CLI loads it with `import 'dotenv/config'`.
 */
export function getTypeOrmConnectionOptions(): Omit<
  PostgresConnectionOptions,
  'entities' | 'migrations'
> {
  const port = Number.parseInt(process.env.DB_PORT ?? '5432', 10);

  return {
    type: 'postgres',
    host: process.env.DB_HOST ?? 'localhost',
    port: Number.isNaN(port) ? 5432 : port,
    username: process.env.DB_USERNAME ?? 'postgres',
    password: process.env.DB_PASSWORD ?? '',
    database: process.env.DB_DATABASE ?? 'app-tracker-local',
    synchronize: false,
    migrationsTableName: 'app_tracker_migrations',
  };
}
