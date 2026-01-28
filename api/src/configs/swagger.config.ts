
import { DocumentBuilder } from '@nestjs/swagger';

  export const swaggerConfig = new DocumentBuilder()
    .setTitle('Your API Title')
    .setDescription('The API description')
    .setVersion('1.0')
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .setContact('Your Name', 'https://your-website.com', 'your-email@example.com')
    .setTermsOfService('https://your-website.com/terms')
    .setExternalDoc('Find out more', 'https://your-website.com/docs')
    .addServer('https://your-website.com', "Production server")
    .addServer('http://localhost:3000', "Local development server")
    .addServer('https://staging.your-website.com', "Staging server")
    .addServer('http://localhost:3001', "Testing server")
    .addTag('Users')
    .addTag('Posts')
    // Add bearer authentication if your API uses JWTs
    .addBearerAuth()
    .build();


