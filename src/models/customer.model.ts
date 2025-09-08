import mongoose, { Schema, Document } from 'mongoose';

export interface ICustomer extends Document {
  uniqueCode: string;
  name: string;
  email?: string;
  mobile: string;
  address?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CustomerSchema: Schema<ICustomer> = new Schema(
  {
    uniqueCode: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, lowercase: true, trim: true },
    mobile: { type: String, required: true, trim: true },
    address: { type: String, trim: true }
  },
  { timestamps: true }
);

const CustomerModel = mongoose.model<ICustomer>('Customer', CustomerSchema);

export default CustomerModel;