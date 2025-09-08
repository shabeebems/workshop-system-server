import VehicleModel, { IVehicle } from "../../models/vehicle.model";
import { BaseRepository } from "./base.repositories";
import { IVehicleRepository } from "../interfaces/vehicle.interface";

export class VehicleRepository
  extends BaseRepository<IVehicle>
  implements IVehicleRepository
{
  constructor() {
    super(VehicleModel);
  }

  findByVehicleNumber = (vehicleNumber: string): Promise<IVehicle | null> =>
    this.model.findOne({ vehicleNumber: vehicleNumber.toUpperCase() })

  findByCustomerId = (customerId: string): Promise<IVehicle[]> =>
    this.model.find({ customerId })

  searchVehicles = (searchTerm: string): Promise<IVehicle[]> =>
    this.model.find({
      $or: [
        { vehicleNumber: { $regex: searchTerm, $options: 'i' } },
        { make: { $regex: searchTerm, $options: 'i' } },
        { vehicleModel: { $regex: searchTerm, $options: 'i' } },
        { color: { $regex: searchTerm, $options: 'i' } }
      ]
    })
}