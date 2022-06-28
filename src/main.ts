import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors();
  app.use(helmet, helmet.xssFilter());
  await app.listen(process.env.PORT || 5000);
}
bootstrap();
