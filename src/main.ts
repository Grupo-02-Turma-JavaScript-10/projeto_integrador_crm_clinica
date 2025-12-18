import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Medifácil CRM - API')
    .setDescription(`Api para gerenciamento de consultas médicas`)
    .setContact(
      'MediFácil',
      'http://www.medifacil.online',
      'contact@medifacil.com',
    )
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/api', app, document, {
    customSiteTitle: 'CRM MediFácil',
    customfavIcon: 'https://i.imgur.com/Vz4xT2W.png',
    customCss: `
      .swagger-ui .topbar { 
        background: linear-gradient(135deg, #2d8a2dff 0%, #38c87dff 100%);
        box-shadow: 0 2px 4px rgba(19, 19, 19, 0.1);
      }
      .swagger-ui .info .title {
        color: #0e0e0e;\
      }
      .topbar-wrapper .link::before {
      content: url('https://i.imgur.com/Vz4xT2W.png');
      font-size: 50px;
      margin-right: 8px;
      }
      .information-container .info .title::before {
      content: url('https://i.imgur.com/Vz4xT2W.png');
      font-size: 40px;
      margin-right: 25px;
      }
      .information-container .info .title {
      display: flex;
      align-items: center;
      }
      body {
        background-color: #d5e7f1ff;
      }
    `,
  });

  process.env.TZ = '-03:00';
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
