import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  getHello(): string {
    return 'Realizando deploy com GitHub Actions e AWS EKS - Versão final!';
  }

}
