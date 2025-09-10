"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRepository = void 0;
const order_model_1 = __importDefault(require("../../models/order.model"));
const base_repositories_1 = require("./base.repositories");
class OrderRepository extends base_repositories_1.BaseRepository {
    constructor() {
        super(order_model_1.default);
        this.findByOrderNumber = (orderNumber) => this.model.findOne({ orderNumber }).populate(['customerId', 'vehicleId']);
        this.findByCustomerId = (customerId) => this.model.find({ customerId }).populate(['customerId', 'vehicleId']);
        this.findByVehicleId = (vehicleId) => this.model.find({ vehicleId }).populate(['customerId', 'vehicleId']);
    }
}
exports.OrderRepository = OrderRepository;
