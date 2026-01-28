import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

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

  await app.listen(process.env.PORT);
}
bootstrap();
