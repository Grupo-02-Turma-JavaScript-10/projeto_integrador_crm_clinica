import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('registrar')
  registrar(
    @Body()
    body: {
      usuario: string;
      senha: string;
      nome: string;
      foto: string;
    },
  ) {
    return this.authService.registrar(
      body.usuario,
      body.senha,
      body.nome,
      body.foto,
    );
  }

  @Post('login')
  login(
    @Body()
    body: {
      usuario: string;
      senha: string;
    },
  ) {
    return this.authService.login(body.usuario, body.senha);
  }
}
