import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { AuthMutationResolver } from './resolvers/auth.mutation.resolvers';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  providers: [AuthService, AuthMutationResolver, LocalStrategy],
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (ConfigService) => ({
        secret: ConfigService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1m' },
      }),
    }),
  ],
})
export class AuthModule {}
