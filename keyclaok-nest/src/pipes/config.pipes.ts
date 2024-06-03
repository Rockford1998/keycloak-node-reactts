import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  ExecutionContext,
} from '@nestjs/common';

@Injectable()
export class FirstPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // const request = this.context.switchToHttp().getRequest();
    console.log('first pipe');
    // Access the request object here and modify data accordingly
    return value;
  }
}

@Injectable()
export class SecondPipe implements PipeTransform {
  constructor(private readonly context: ExecutionContext) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const request = this.context.switchToHttp().getRequest();
    console.log('second pipe');
    // Access the request object here and modify data accordingly
    return value;
  }
}

@Injectable()
export class ThirdPipe implements PipeTransform {
  constructor(private readonly context: ExecutionContext) {}
  transform(value: any, metadata: ArgumentMetadata) {
    const request = this.context.switchToHttp().getRequest();
    console.log('third pipe');
    // Access the request object here and modify data accordingly
    return value;
  }
}
