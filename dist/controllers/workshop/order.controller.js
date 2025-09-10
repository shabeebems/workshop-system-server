"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const statusCode_1 = require("../../constants/statusCode");
const messages_1 = require("../../constants/messages");
const order_service_1 = require("../../services/workshop/implementations/order.service");
class OrderController {
    constructor() {
        this.orderService = new order_service_1.OrderService();
        this.createOrder = (req, res) => this.handleRequest(res, () => this.orderService.createOrder(req.body));
        this.updateOrder = (req, res) => this.handleRequest(res, () => this.orderService.updateOrder(req.params.orderNumber, req.body));
        this.getOrderByNumber = (req, res) => this.handleRequest(res, () => this.orderService.getOrderByNumber(req.params.orderNumber));
        this.getOrdersByCustomer = (req, res) => this.handleRequest(res, () => this.orderService.getOrdersByCustomer(req.params.customerId));
        this.getOrdersByVehicle = (req, res) => this.handleRequest(res, () => this.orderService.getOrdersByVehicle(req.params.vehicleId));
        this.getAllOrders = (req, res) => this.handleRequest(res, () => this.orderService.getAllOrders());
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
exports.OrderController = OrderController;
