import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Schema as MongooseSchema } from "mongoose";
import { User } from "../../users/entities/user.entity";
import { Service } from "../../services/entities/service.entity";
export type OrderDocument=HydratedDocument<Order>

@Schema()
export class Order {
    @Prop({type:MongooseSchema.Types.String, ref: "Users"})
    userId:User

    @Prop({type:MongooseSchema.Types.String, ref:"Service"})
    serviceId:Service

    @Prop()
    price:number
    
    @Prop({default:Date.now()})
    createdAt:Date

    @Prop({default:Date.now()})
    updatedAt:Date
}

export const OrderSchema=SchemaFactory.createForClass(Order)
