import mongoose, { Schema, Document } from 'mongoose';

export interface IVehicle extends Document {
  vehicleNumber: string;
  make: string;
  vehicleModel: string;
  year?: number;
  color?: string;
  engineNumber?: string;
  chassisNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

const VehicleSchema: Schema<IVehicle> = new Schema(
  {
    vehicleNumber: { type: String, required: true, unique: true, trim: true, uppercase: true },
    make: { type: String, required: true, trim: true },
    vehicleModel: { type: String, required: true, trim: true },
    year: { type: Number },
    color: { type: String, trim: true },
    engineNumber: { type: String, trim: true },
    chassisNumber: { type: String, trim: true }
  },
  { timestamps: true }
);

const VehicleModel = mongoose.model<IVehicle>('Vehicle', VehicleSchema);

export default VehicleModel;