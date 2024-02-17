import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Mixed } from 'mongoose';
export type UserDocument = User & Document;



@Schema( { timestamps: true } )
export class User {

    @Prop( { default: ''} )
    email: string

    @Prop( { default: ''} )
    username: string

    @Prop({default:''})
    password:string
}
export const UserSchema = SchemaFactory.createForClass( User);
