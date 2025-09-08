import { ServiceResponse } from "../../auth/interfaces/auth.interface";
import { CreateVehicleInput, UpdateVehicleInput } from "../../../schemas/vehicle.schema";

export interface IVehicleService {
  createVehicle(data: CreateVehicleInput): Promise<ServiceResponse>;
  updateVehicle(vehicleNumber: string, data: UpdateVehicleInput): Promise<ServiceResponse>;
  getVehicleByNumber(vehicleNumber: string): Promise<ServiceResponse>;
  getAllVehicles(): Promise<ServiceResponse>;
  searchVehicles(searchTerm: string): Promise<ServiceResponse>;
}