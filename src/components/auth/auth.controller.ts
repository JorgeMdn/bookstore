import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('/signup')
  @UsePipes(ValidationPipe) // nos ayuda a que las validaciones que estan en nuestro dto se cumplan
  async signup(@Body() signUpDto: SignUpDto): Promise<void> {
    return await this._authService.signup(signUpDto);
  }

  @Post('/signin')
  @UsePipes(ValidationPipe)
  async signin(@Body() signInDto: SignInDto) {
    return await this._authService.signin(signInDto);
  }
}
