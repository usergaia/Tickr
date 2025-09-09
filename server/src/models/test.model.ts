import mongoose, { Schema, Document } from "mongoose";
import { Stocks } from "./stocks.model";

// typeScript interface
export interface Test extends Document {
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

// schema
const TestSchema: Schema = new Schema({
  name: { type: String, required: [true, "Name is required"] },
  username: { type: String, required: [true, "Username is required"] },
  email: { type: String, required: [true, "Email is required"] },
  phone: { type: String, required: [true, "Phone is required"] },
  website: { type: String, required: [true, "Website is required"] },
});

const TestModel = mongoose.model<Test>("Test", TestSchema, "test_api_store");

export default TestModel;
