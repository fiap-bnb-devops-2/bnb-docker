import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  getHello(): string {
    return 'Deploy na AWS por meio do EKS!';
  }

}
