import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import basicAuth from 'express-basic-auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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
        'https://ipick-server-app-873909369714.asia-southeast1.run.app'
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
      whitelist: true, // Strip unknown properties
      forbidNonWhitelisted: true, // Throw error if extra fields are sent
      transform: true, // Auto-transform payloads to DTO instances
    }),
  );

  // Swagger setup
  const swaggerConfig = new DocumentBuilder()
    .setTitle('iPick API')
    .setDescription('API documentation')
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

  // Serve Swagger UI
  SwaggerModule.setup('api', app, swaggerDocument, {
    swaggerOptions: {
      tagsSorter: 'alpha',
    },
  });

  // Set a global API prefix if needed (e.g., 'v1')
  // app.setGlobalPrefix('v1');

  const port = process.env.PORT || 8080;
  await app.listen(port);
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`Swagger UI is available at http://localhost:${port}/api`);
}
bootstrap();
