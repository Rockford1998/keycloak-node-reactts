import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DemoController } from './demo.controller';
import { LoggerMiddleware } from './demo.middleware';
import { FirstPipe } from './pipes/config.pipes';


@Module({
  imports: [],
  controllers: [DemoController],
  providers: [],
})
export class DemoModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(DemoController);
  }
}
