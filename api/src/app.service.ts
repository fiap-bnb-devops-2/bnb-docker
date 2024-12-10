import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  getHello(): string {
    return 'Realizando deploy com Jenkins na Azure - Versão final!';
  }

}
