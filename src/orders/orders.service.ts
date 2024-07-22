import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from './entities/order.entity';
import { Model, Types } from 'mongoose';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private readonly OrderModel:Model<OrderDocument>){}

  async create(createOrderDto: CreateOrderDto):Promise<Order> {
    const newOrder=new this.OrderModel(createOrderDto)
    return newOrder.save()
  }

  async findAll():Promise<Order[]> {
    return this.OrderModel.find().exec()
  }

  async findOne(id: string):Promise<Order[]> {
    const objectId=new Types.ObjectId(id)
    return this.OrderModel.find(objectId).exec();
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const objectId=new Types.ObjectId(id)
    return this.OrderModel.findByIdAndUpdate(objectId, updateOrderDto, {new:true}).exec()
  }

  async remove(id: string) {
    const objectId=new Types.ObjectId(id)
    return this.OrderModel.findByIdAndDelete(objectId).exec()
  }
}
