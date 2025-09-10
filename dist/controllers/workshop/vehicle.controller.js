"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleController = void 0;
const statusCode_1 = require("../../constants/statusCode");
const messages_1 = require("../../constants/messages");
const vehicle_service_1 = require("../../services/workshop/implementations/vehicle.service");
class VehicleController {
    constructor() {
        this.vehicleService = new vehicle_service_1.VehicleService();
        this.createVehicle = (req, res) => this.handleRequest(res, () => this.vehicleService.createVehicle(req.body));
        this.updateVehicle = (req, res) => this.handleRequest(res, () => this.vehicleService.updateVehicle(req.params.vehicleNumber, req.body));
        this.searchVehicles = (req, res) => this.handleRequest(res, () => this.vehicleService.searchVehicles(req.query.search));
        this.getVehicleByNumber = (req, res) => this.handleRequest(res, () => this.vehicleService.getVehicleByNumber(req.params.vehicleNumber));
        this.getAllVehicles = (req, res) => this.handleRequest(res, () => this.vehicleService.getAllVehicles());
    }
    async handleRequest(res, fn) {
        try {
            const { success, message, data } = await fn();
            const status = success ? statusCode_1.HttpStatus.OK : statusCode_1.HttpStatus.BAD_REQUEST;
            res.status(status).json({ success, message, data });
        }
        catch (error) {
            res.status(statusCode_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: messages_1.Messages.INTERNAL_SERVER_ERROR,
            });
        }
    }
}
exports.VehicleController = VehicleController;
