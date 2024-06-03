import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DemoModule } from './demo.module';
import { AuthMiddleware } from './middleware/auth.middleware';

@Module({
  imports: [DemoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
