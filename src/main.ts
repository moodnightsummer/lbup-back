import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './commons/filters/HttpException.filter';
import { ValidationPipe } from '@nestjs/common/pipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS 설정
  app.enableCors({
    origin: '*', // 모든 출처 허용
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // 허용할 HTTP 메서드
    credentials: true, // 쿠키 전송을 허용할 경우 true로 설정
    allowedHeaders:
      'Content-Type, Authorization, X-Requested-With, Accept, Cookie', // 허용할 HTTP 헤더
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      whitelist: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(process.env.PORT);
}
bootstrap();
