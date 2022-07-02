import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('Restful API')
    .setVersion('v0.0.1')
    .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);
    
    // app.enableCors({
    //   origin: [
    //     'http://localhost:3000',
    //     'http://example.com',
    //     'http://www.example.com',
    //     'http://app.example.com',
    //     'https://example.com',
    //     'https://www.example.com',
    //     'https://app.example.com',
    //   ],
    //   allowedHeaders: 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
    //   methods: "GET,PUT,POST,DELETE,UPDATE,OPTIONS",
    //   credentials: true,
    // });

    // app.use((req, res, next) => {
    //   res.header('Access-Control-Allow-Origin', '*');
    //   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    //   res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    //   next();
    // });
    
    await app.listen(process.env.PORT);
    app.useGlobalPipes(new ValidationPipe());
}
bootstrap();
