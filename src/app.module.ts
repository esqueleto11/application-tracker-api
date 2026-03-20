import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule, type TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { getTypeOrmConnectionOptions } from './config/typeorm-connection.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // First-listed file wins on duplicate keys; list `.env.local` first so it overrides `.env`.
      envFilePath: ['.env.local', '.env'],
    }),
    TypeOrmModule.forRoot({
      ...getTypeOrmConnectionOptions(),
      autoLoadEntities: true,
      migrations: [__dirname + '/db/migrations/*{.js,.ts}'],
    } satisfies TypeOrmModuleOptions),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
