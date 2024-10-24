import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  getHello(): string {
    return 'Página inicial da API';
  }

  listUsers() {
    return 'Listando os usuários do Banco de Dados a partir do arquivo service';
  }

}
