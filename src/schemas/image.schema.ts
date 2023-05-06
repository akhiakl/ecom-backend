import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ImageDocument = Image & Document;

@Schema()
export class Image {
  @Prop()
  filename: string;

  @Prop()
  mimetype: string;

  @Prop()
  encoding: string;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
