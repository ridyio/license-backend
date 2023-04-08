import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { ConfigModule } from '@nestjs/config';
import { ClientModule } from './client/client.module';
import { AppService } from './app.service';
import { EnvatoModule } from './envato/envato.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    EnvatoModule,
    ClientModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST ?? 'localhost',
      port: 3306,
      username: process.env.MYSQL_USER ?? 'root',
      password: process.env.MYSQL_PASSWORD ?? 'defaultpassword',
      database: process.env.MYSQL_DATABASE ?? 'license_nest',
      autoLoadEntities: true,
      synchronize: false,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
