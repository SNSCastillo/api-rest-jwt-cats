import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
// import { jwtConstants } from './constants/jwt.constants';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        global: true,
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),

    // JwtModule.register({
    //   global: true,
    //   secret: jwtConstants.secret,
    //   signOptions: { expiresIn: '1d' },
    //   // Falta configurar el fresh Token
    //   // https://docs.nestjs.com/security/authentication#jwt-refresh-token
    // }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [JwtModule] // Exportamos el JwtModule para que esté disponible en otros módulos
})
export class AuthModule { }
