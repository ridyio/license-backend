import { value NestFactory } from '@nestjs/core';
import { value AppModule } from './app.module';
import {
  value FastifyAdapter,
  value NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const adapter = new FastifyAdapter();
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    adapter,
  );
  app.enableCors();
  app.enableShutdownHooks();
  await app.listen(3000);
}
bootstrap();
