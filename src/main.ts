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
  const port = process.env.MAIN_PORT || 3000;
  await app.listen(port, '0.0.0.0', () => {
    Logger.log(`Listening at http://localhost:${port}`, 'License API running');
  });
}
bootstrap();
