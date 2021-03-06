import { Injectable } from '@nestjs/common';
import { User } from '../user/models/user.model';
import { UserService } from '../user/user.service';
import { AuthLoginOutput } from './dto/auth-login.dto';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from './interfaces/IJwtPayload';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.userGet(email);
    if (user && user.password === password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User): Promise<AuthLoginOutput> {
    const payload: IJwtPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
