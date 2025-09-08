import { VehicleRepository } from "../../../repositories/implementations/vehicle.repositories";
import { CustomerRepository } from "../../../repositories/implementations/customer.repositories";
import { IVehicleService } from "../interfaces/vehicle.interface";
import { ServiceResponse } from "../../auth/interfaces/auth.interface";
import { CreateVehicleInput, UpdateVehicleInput } from "../../../schemas/vehicle.schema";

export class VehicleService implements IVehicleService {
  private vehicleRepository = new VehicleRepository();

  public async createVehicle(data: CreateVehicleInput): Promise<ServiceResponse> {
    try {
      // Check if vehicle number already exists
      const existingVehicle = await this.vehicleRepository.findByVehicleNumber(data.vehicleNumber);
      if (existingVehicle) {
        return { success: false, message: "Vehicle with this number already exists" };
      }

      const vehicle = await this.vehicleRepository.create(data);
      return { success: true, message: "Vehicle created successfully", data: vehicle };
    } catch (error: any) {
      return { success: false, message: error.message || "Failed to create vehicle" };
    }
  }

  public async updateVehicle(vehicleNumber: string, data: UpdateVehicleInput): Promise<ServiceResponse> {
    try {
      const vehicle = await this.vehicleRepository.findByVehicleNumber(vehicleNumber);
      if (!vehicle) {
        return { success: false, message: "Vehicle not found" };
      }
      const updatedVehicle = await this.vehicleRepository.updateById(vehicle._id, data);
      return { success: true, message: "Vehicle updated successfully", data: updatedVehicle };
    } catch (error: any) {
      return { success: false, message: error.message || "Failed to update vehicle" };
    }
  }
  
  public async searchVehicles(searchTerm: string): Promise<ServiceResponse> {
    try {
      const vehicles = await this.vehicleRepository.searchVehicles(searchTerm);
      return { success: true, message: "Search completed", data: vehicles };
    } catch (error: any) {
      return { success: false, message: error.message || "Failed to search vehicles" };
    }
  }

  public async getVehicleByNumber(vehicleNumber: string): Promise<ServiceResponse> {
    try {
      const vehicle = await this.vehicleRepository.findByVehicleNumber(vehicleNumber);
      if (!vehicle) {
        return { success: false, message: "Vehicle not found" };
      }

      return { success: true, message: "Vehicle found", data: vehicle };
    } catch (error: any) {
      return { success: false, message: error.message || "Failed to get vehicle" };
    }
  }

  public async getAllVehicles(): Promise<ServiceResponse> {
    try {
      const vehicles = await this.vehicleRepository.findAll();
      return { success: true, message: "Vehicles retrieved successfully", data: vehicles };
    } catch (error: any) {
      return { success: false, message: error.message || "Failed to get vehicles" };
    }
  }
}