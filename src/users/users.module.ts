import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)], // Esto es para que el módulo de auth tiene una dependencia circular con el módulo de users
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService] // Para que el módulo de auth lo pueda usar
})
export class UsersModule { }
