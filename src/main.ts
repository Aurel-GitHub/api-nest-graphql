import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    helmet({
      contentSecurityPolicy:
        process.env.NODE_ENV === 'production' ? undefined : false,
    }),
  );
  const corsOptions = {
    origin: (
      origin: string | undefined,
      callback: (err: Error | null, check?: boolean) => Error | void,
    ) => {
      if (process.env.NODE_ENV === 'development') {
        return callback(null, true);
      }
      // if (whitelistedUrls.indexOf(origin as string) !== -1) {
      //   return callback(null, true);
      // }
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    exposedHeaders: ['x-authorization'],
  };
  app.enableCors(corsOptions);

  await app.listen(process.env.PORT || 5000);
}
bootstrap();
