import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Mixed } from 'mongoose';
import { Binary } from 'mongodb';
export type UserDocument = Job & Document;




@Schema( { timestamps: true } )
export class Job {
    @Prop()
    created_by:string

    @Prop()
    image_id:string

    @Prop()
    status:string

    @Prop()
    tenet_id:string

    @Prop()
    client_id:string
}
export const JobSchema = SchemaFactory.createForClass( Job);
