import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPreset = process.env.GLOBAL_PRESET || '';
  if (process.env.SWAGGER_ENABLED === 'true') {
    const config = new DocumentBuilder()
      .setTitle('HK-Pragati')
      .setDescription('Hk-Pragati API description')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(`${globalPreset}/swagger`, app, document);
  }
  const port = process.env.NODE_PORT || 3000;
  await app.listen(port, () => console.log('Listening to port', port));
}
bootstrap();
