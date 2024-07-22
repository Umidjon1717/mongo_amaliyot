import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import {v4 as uuidv4} from 'uuid'
export type ServiceDocument=HydratedDocument<Service>

@Schema()
export class Service {
    @Prop({type:String, default:uuidv4, unique:true})
    id:string

    @Prop()
    name:string

    @Prop()
    description: string

    @Prop()
    price: number

    @Prop({default:Date.now()})
    createdAt:Date

    @Prop({default:Date.now()})
    updatedAt:Date
}

export const ServiceSchema=SchemaFactory.createForClass(Service)
