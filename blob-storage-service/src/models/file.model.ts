import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Mixed } from 'mongoose';
import { Binary } from 'mongodb';
export type UserDocument = File & Document;




@Schema( { timestamps: true } )
export class File {
    @Prop()
    image:Binary


}
export const FileSchema = SchemaFactory.createForClass( File);
