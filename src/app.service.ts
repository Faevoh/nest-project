import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  welcomeMessage(): string {
    return 'This is a Simple API for a store where users can upload their products';
  }
}
