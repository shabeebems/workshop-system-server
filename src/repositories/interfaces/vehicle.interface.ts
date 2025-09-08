import { IVehicle } from "../../models/vehicle.model";
import { IBaseRepository } from "./base.interface";

export interface IVehicleRepository extends IBaseRepository<IVehicle> {
  findByVehicleNumber(vehicleNumber: string): Promise<IVehicle | null>;
  findByCustomerId(customerId: string): Promise<IVehicle[]>;
  searchVehicles(searchTerm: string): Promise<IVehicle[]>;
}