import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { AuthService } from '../services/auth.service';
import { UsuarioLogin } from '../entities/usuariologin.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Medicos')
@Controller("/medicos")
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('/logar')
    login(@Body() usuario: UsuarioLogin): Promise<any> {
        return this.authService.login(usuario);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/me')
    getProfile(@Request() req): Promise<any> {
        return this.authService.getProfile(req.user.sub);
    }

}