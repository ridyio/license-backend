import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const adapter = new FastifyAdapter();
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    adapter,
  );
  app.enableCors();
  app.enableShutdownHooks();
  await app.listen(3000, '0.0.0.0', () => {
    Logger.log(`Listening at http://localhost:${3000}`, 'Fleet API');
  });
}
bootstrap();
