"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const order_repositories_1 = require("../../../repositories/implementations/order.repositories");
const customer_repositories_1 = require("../../../repositories/implementations/customer.repositories");
const vehicle_repositories_1 = require("../../../repositories/implementations/vehicle.repositories");
const orderCode_1 = require("../../../utils/orderCode");
class OrderService {
    constructor() {
        this.orderRepository = new order_repositories_1.OrderRepository();
        this.customerRepository = new customer_repositories_1.CustomerRepository();
        this.vehicleRepository = new vehicle_repositories_1.VehicleRepository();
    }
    async createOrder(data) {
        try {
            // Verify customer exists
            const customer = await this.customerRepository.findById(data.customerId);
            if (!customer) {
                return { success: false, message: "Customer not found" };
            }
            // Verify vehicle exists
            const vehicle = await this.vehicleRepository.findById(data.vehicleId);
            if (!vehicle) {
                return { success: false, message: "Vehicle not found" };
            }
            let code;
            let existingOrder;
            do {
                code = (0, orderCode_1.generateOrderNumber)();
                existingOrder = await this.orderRepository.findByOrderNumber(code);
            } while (existingOrder);
            // Calculate total amount
            const totalAmount = data.services.reduce((sum, service) => sum + service.amount, 0);
            const orderData = {
                ...data,
                totalAmount, orderNumber: code
            };
            const order = await this.orderRepository.create(orderData);
            return { success: true, message: "Order created successfully", data: order };
        }
        catch (error) {
            return { success: false, message: error.message || "Failed to create order" };
        }
    }
    async updateOrder(orderNumber, data) {
        try {
            const order = await this.orderRepository.findByOrderNumber(orderNumber);
            if (!order) {
                return { success: false, message: "Order not found" };
            }
            // Recalculate total if services are updated
            if (data.services) {
                const totalAmount = data.services.reduce((sum, service) => sum + service.amount, 0);
                data = { ...data, totalAmount };
            }
            const updatedOrder = await this.orderRepository.updateById(order._id, data);
            return { success: true, message: "Order updated successfully", data: updatedOrder };
        }
        catch (error) {
            return { success: false, message: error.message || "Failed to update order" };
        }
    }
    async getOrderByNumber(orderNumber) {
        try {
            const order = await this.orderRepository.findByOrderNumber(orderNumber);
            if (!order) {
                return { success: false, message: "Order not found" };
            }
            return { success: true, message: "Order found", data: order };
        }
        catch (error) {
            return { success: false, message: error.message || "Failed to get order" };
        }
    }
    async getOrdersByCustomer(customerId) {
        try {
            const orders = await this.orderRepository.findByCustomerId(customerId);
            return { success: true, message: "Orders retrieved successfully", data: orders };
        }
        catch (error) {
            return { success: false, message: error.message || "Failed to get orders" };
        }
    }
    async getOrdersByVehicle(vehicleId) {
        try {
            const orders = await this.orderRepository.findByVehicleId(vehicleId);
            return { success: true, message: "Orders retrieved successfully", data: orders };
        }
        catch (error) {
            return { success: false, message: error.message || "Failed to get orders" };
        }
    }
    async getAllOrders() {
        try {
            const orders = await this.orderRepository.findAll();
            return { success: true, message: "Orders retrieved successfully", data: orders };
        }
        catch (error) {
            return { success: false, message: error.message || "Failed to get orders" };
        }
    }
}
exports.OrderService = OrderService;
