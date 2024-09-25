import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  sanityCheck(): string {
    return 'Hello World!';
  }
}
