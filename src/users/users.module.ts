import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  JwtModule.register({
    secret: '12345',
    global: true,
    signOptions: { expiresIn: '100s' }
  })],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule { }
