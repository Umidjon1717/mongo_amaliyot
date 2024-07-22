import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Service, ServiceDocument } from './entities/service.entity';
import { Model, Types } from 'mongoose';

@Injectable()
export class ServicesService {
  constructor(@InjectModel(Service.name) private readonly ServiceModel: Model<ServiceDocument>) { }

  async create(createServiceDto: CreateServiceDto): Promise<Service> {
    const newService = new this.ServiceModel(createServiceDto)
    return newService.save()
  }

  async findAll(): Promise<Service[]> {
    return this.ServiceModel.find().exec()
  }

  async findOne(id: string): Promise<Service[]> {
    const objectId = new Types.ObjectId(id)
    return this.ServiceModel.find(objectId).exec()
  }

  async update(id: string, updateServiceDto: UpdateServiceDto): Promise<Service> {
    const objectId = new Types.ObjectId(id)
    return this.ServiceModel.findByIdAndUpdate(objectId, updateServiceDto, { new: true }).exec()
  }

  async remove(id: string): Promise<Service> {
    const objectId = new Types.ObjectId(id)
    return this.ServiceModel.findByIdAndDelete(objectId, { new: true }).exec()
  }
}
