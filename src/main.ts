import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('CRM Medifácil API')
    .setDescription(
      `MediFácil - Api para gerenciamento de consultas médicas
      \n\n Responsáveis: Pamela R, Eduardo R, Karoline, Kali F, Enrique A, Alan, Livia`,
    )
    .setContact(
      'MediFácil',
      'http://www.medifacil.online',
      'contact@medifacil.com',
    )
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/swagger', app, document, {
    customSiteTitle: 'CRM MediFácil',
    customfavIcon: '/favicon.ico',
    customCss: `
      .topbar-wrapper img { 
        content: url('/logo.png'); 
        height: 70px; 
        width: auto; 
        margin-right: 15px;
      }
      .swagger-ui .topbar { 
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }
      .swagger-ui .info .title {
        color: black;
      }
    `,
  });

  process.env.TZ = '-03:00';
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
