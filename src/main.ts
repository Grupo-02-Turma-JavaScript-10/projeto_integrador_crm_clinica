import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('CRMed - API')
    .setDescription(`API para gerenciamento de consultas médicas`)
    .setContact(
      'CRMed',
      'http://www.CRMed.online',
      'contact@crmed.com',
    )
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/api', app, document, {
    customSiteTitle: 'CRMed',
    customfavIcon: 'https://i.imgur.com/siAxTvd.png',
    customCss: `
      .swagger-ui .topbar { 
        background: linear-gradient(135deg, #2d8a2dff 0%, #38c87dff 100%);
        box-shadow: 0 2px 4px rgba(19, 19, 19, 0.1);
      }
      .swagger-ui .info .title {
        color: #0e0e0e;\
      }
      .topbar-wrapper .link::before {
      font-size: 20px;
      margin-right: 8px;
      }
      .information-container .info .title::before {
      content: url('https://i.imgur.com/wow0MaD.png');
      font-size: 40px;
      margin-right: 25px;
      }
      .information-container .info .title {
      display: flex;
      align-items: center;
      }
      body {
        background-color: #ecededff;
      }
      .information-container .info .description p {
        color: #0e0e0e; !important;
        font-size: 30px;
        line-height: 1.7;
        margin-bottom: 15px;
      }
    `,
  });

  process.env.TZ = '-03:00';
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
