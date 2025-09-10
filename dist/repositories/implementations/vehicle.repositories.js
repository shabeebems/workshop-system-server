"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleRepository = void 0;
const vehicle_model_1 = __importDefault(require("../../models/vehicle.model"));
const base_repositories_1 = require("./base.repositories");
class VehicleRepository extends base_repositories_1.BaseRepository {
    constructor() {
        super(vehicle_model_1.default);
        this.findByVehicleNumber = (vehicleNumber) => this.model.findOne({ vehicleNumber: vehicleNumber.toUpperCase() });
        this.findByCustomerId = (customerId) => this.model.find({ customerId });
        this.searchVehicles = (searchTerm) => this.model.find({
            $or: [
                { vehicleNumber: { $regex: searchTerm, $options: 'i' } },
                { make: { $regex: searchTerm, $options: 'i' } },
                { vehicleModel: { $regex: searchTerm, $options: 'i' } },
                { color: { $regex: searchTerm, $options: 'i' } }
            ]
        });
    }
}
exports.VehicleRepository = VehicleRepository;
