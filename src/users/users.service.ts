import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Model, Types } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel:Model<UserDocument>,
  private jwtService:JwtService){}

  async GenerateRefreshToken(user:User):Promise<string>{
    const payload={email:user.email, id:user.id, role:user.role}
    return this.jwtService.sign(payload, {
      secret:'12345',
      expiresIn:'10h'
    })
  }

  async GenerateAccessToken(user:User):Promise<string>{
    const payload={email:user.email, id:user.id, role:user.role}
    return this.jwtService.sign(payload,{
      secret:'12345',
      expiresIn:'10m'
    })
    
  }

  async signUp(createUserDto: CreateUserDto):Promise<User> {
    const hashedPassword=await bcrypt.hash(createUserDto.password, 10)
    const newUser=new this.userModel(createUserDto)
    const savedUser=await newUser.save()
    return {
      id:savedUser.id,
      email:savedUser.email,
      password:hashedPassword,
      username: savedUser.username,
      isVerified:savedUser.isVerified,
      role:savedUser.role,
      createdAt:savedUser.createdAt,
      updatedAt:savedUser.updatedAt
    }
  }

  async SignIn(email:string, password:string):Promise<{ accessToken: Promise<string>; refreshToken: 
    Promise<string> }>  {
    const user=await this.userModel.findOne({email})
    if(!user){
      throw new UnauthorizedException('User not found')
    }

    if(user.password!==password){
      throw new UnauthorizedException('Wrong Password')
    }

    const accessToken=this.GenerateAccessToken(await user)
    const refreshToken=this.GenerateRefreshToken(await user)
    return {accessToken, refreshToken}
  }


  async findAll():Promise<User[]> {
    return this.userModel.find().exec()
  }

  async findOne(id: string):Promise<User[]> {
    const objectId=new Types.ObjectId(id)
    return this.userModel.find(objectId)
  }

  async update(id: string, updateUserDto: UpdateUserDto):Promise<User> {
    const objectId=new Types.ObjectId(id)
    return this.userModel.findByIdAndUpdate(objectId, updateUserDto, {new:true}).exec()
  }

  async remove(id: string):Promise<User> {
    const objectId=new Types.ObjectId(id)
    return this.userModel.findByIdAndDelete(objectId , {new:true}).exec()
  }
}
