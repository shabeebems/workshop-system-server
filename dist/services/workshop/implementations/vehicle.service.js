"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleService = void 0;
const vehicle_repositories_1 = require("../../../repositories/implementations/vehicle.repositories");
class VehicleService {
    constructor() {
        this.vehicleRepository = new vehicle_repositories_1.VehicleRepository();
    }
    async createVehicle(data) {
        try {
            // Check if vehicle number already exists
            const existingVehicle = await this.vehicleRepository.findByVehicleNumber(data.vehicleNumber);
            if (existingVehicle) {
                return { success: false, message: "Vehicle with this number already exists" };
            }
            const vehicle = await this.vehicleRepository.create(data);
            return { success: true, message: "Vehicle created successfully", data: vehicle };
        }
        catch (error) {
            return { success: false, message: error.message || "Failed to create vehicle" };
        }
    }
    async updateVehicle(vehicleNumber, data) {
        try {
            const vehicle = await this.vehicleRepository.findByVehicleNumber(vehicleNumber);
            if (!vehicle) {
                return { success: false, message: "Vehicle not found" };
            }
            const updatedVehicle = await this.vehicleRepository.updateById(vehicle._id, data);
            return { success: true, message: "Vehicle updated successfully", data: updatedVehicle };
        }
        catch (error) {
            return { success: false, message: error.message || "Failed to update vehicle" };
        }
    }
    async searchVehicles(searchTerm) {
        try {
            const vehicles = await this.vehicleRepository.searchVehicles(searchTerm);
            return { success: true, message: "Search completed", data: vehicles };
        }
        catch (error) {
            return { success: false, message: error.message || "Failed to search vehicles" };
        }
    }
    async getVehicleByNumber(vehicleNumber) {
        try {
            const vehicle = await this.vehicleRepository.findByVehicleNumber(vehicleNumber);
            if (!vehicle) {
                return { success: false, message: "Vehicle not found" };
            }
            return { success: true, message: "Vehicle found", data: vehicle };
        }
        catch (error) {
            return { success: false, message: error.message || "Failed to get vehicle" };
        }
    }
    async getAllVehicles() {
        try {
            const vehicles = await this.vehicleRepository.findAll();
            return { success: true, message: "Vehicles retrieved successfully", data: vehicles };
        }
        catch (error) {
            return { success: false, message: error.message || "Failed to get vehicles" };
        }
    }
}
exports.VehicleService = VehicleService;
