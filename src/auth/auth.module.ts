import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [ConfigModule.forRoot(),
    TypeOrmModule.forFeature([
      User
    ]),
    
    JwtModule.register({
      secret:process.env.JWT_SECRET,
      global:true,
      signOptions:{expiresIn: '60m'}
    })
  ]
})
export class AuthModule {}
