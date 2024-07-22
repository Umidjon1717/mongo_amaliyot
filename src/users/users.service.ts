import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Model, Types } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel:Model<UserDocument>){}

  async create(createUserDto: CreateUserDto):Promise<User> {
    const newUser=new this.userModel(createUserDto)
    return newUser.save()
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
