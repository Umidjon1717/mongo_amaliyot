import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { UserRole } from "../enum/enum.user.role";
import { HydratedDocument } from "mongoose";
import {v4 as uuidv4} from 'uuid'

export type UserDocument=HydratedDocument<User>

@Schema()
export class User {
    @Prop({type:String, default:uuidv4, unique:true})
    id:string

    @Prop()
    username:string

    @Prop({unique:true})
    email:string

    @Prop()
    password:string

    @Prop({default:UserRole.user})
    role:UserRole

    @Prop()
    isVerified:boolean

    @Prop({default:Date.now()})
    createdAt:Date

    @Prop({default:Date.now()})
    updatedAt:Date
}

export const UserSchema=SchemaFactory.createForClass(User)

