import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import basicAuth from 'express-basic-auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable route-level versioning
  app.enableVersioning({
    type: VersioningType.URI, // versions in URL, e.g., /v1/... or /v2/...
    defaultVersion: '1', // default version if not specified
  });

  // Enable CORS
  app.enableCors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        'capacitor://localhost',
        'https://localhost',
        'http://localhost:8100',
        'http://localhost:2099',
        'http://localhost:3000',
        'http://localhost:8080',
        'https://ipick-server-app-873909369714.asia-southeast1.run.app',
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Global Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger setup
  const swaggerConfig = new DocumentBuilder()
    .setTitle('iPick API')
    .setDescription('IPICK API Documentation')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token',
    )
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

  // Protect Swagger UI in production
  if (process.env.NODE_ENV === 'production') {
    app.use(
      ['/api', '/api-json'],
      basicAuth({
        challenge: true,
        users: {
          [process.env.SWAGGER_USER || 'admin']:
            process.env.SWAGGER_PASS || 'secret',
        },
      }),
    );
  }

  SwaggerModule.setup('api', app, swaggerDocument, {
    swaggerOptions: { tagsSorter: 'alpha' },
  });

  const port = process.env.PORT || 8080;
  await app.listen(port);
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`Swagger UI is available at http://localhost:${port}/api`);
}
bootstrap();
