import mongoose, { Schema, Document } from 'mongoose';

export interface IService {
  name: string;
  description?: string;
  amount: number;
}

export interface IOrder extends Document {
  orderNumber: string;
  customerId: mongoose.Types.ObjectId | string;
  vehicleId: mongoose.Types.ObjectId | string;
  services: IService[];
  totalAmount: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema: Schema<IService> = new Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  amount: { type: Number, required: true, min: 0 }
}, { _id: false });

const OrderSchema: Schema<IOrder> = new Schema(
  {
    orderNumber: { type: String, required: true, unique: true, trim: true },
    customerId: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
    vehicleId: { type: Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    services: [ServiceSchema],
    totalAmount: { type: Number, required: true, min: 0 },
    notes: { type: String, trim: true }
  },
  { timestamps: true }
);

const OrderModel = mongoose.model<IOrder>('Order', OrderSchema);

export default OrderModel;