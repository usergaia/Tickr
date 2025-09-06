import mongoose, { Schema, Document } from "mongoose";

// typeScript interface
export interface IItem extends Document {
  name: string;
  age: number;
  employed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// schema
const ItemSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
    },
    employed: {
      type: Boolean,
      required: [true, "Employed status is required"],
    },
  },
  {
    timestamps: true,
  }
);

// model of schema
const ItemModel = mongoose.model<IItem>("Item", ItemSchema);

export default ItemModel;
