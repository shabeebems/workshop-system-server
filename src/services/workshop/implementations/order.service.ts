import { OrderRepository } from "../../../repositories/implementations/order.repositories";
import { CustomerRepository } from "../../../repositories/implementations/customer.repositories";
import { VehicleRepository } from "../../../repositories/implementations/vehicle.repositories";
import { IOrderService } from "../interfaces/order.interface";
import { ServiceResponse } from "../../auth/interfaces/auth.interface";
import { CreateOrderInput, UpdateOrderInput } from "../../../schemas/order.schema";
import { generateOrderNumber } from "../../../utils/orderCode";

export class OrderService implements IOrderService {
  private orderRepository = new OrderRepository();
  private customerRepository = new CustomerRepository();
  private vehicleRepository = new VehicleRepository();

  public async createOrder(data: CreateOrderInput): Promise<ServiceResponse> {
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
        code = generateOrderNumber();
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
    } catch (error: any) {
      return { success: false, message: error.message || "Failed to create order" };
    }
  }

  public async updateOrder(orderNumber: string, data: UpdateOrderInput): Promise<ServiceResponse> {
    try {
      const order = await this.orderRepository.findByOrderNumber(orderNumber);
      if (!order) {
        return { success: false, message: "Order not found" };
      }

      // Recalculate total if services are updated
      if (data.services) {
        const totalAmount = data.services.reduce((sum, service) => sum + service.amount, 0);
        data = { ...data, totalAmount } as any;
      }

      const updatedOrder = await this.orderRepository.updateById(order._id, data);
      return { success: true, message: "Order updated successfully", data: updatedOrder };
    } catch (error: any) {
      return { success: false, message: error.message || "Failed to update order" };
    }
  }

  public async getOrderByNumber(orderNumber: string): Promise<ServiceResponse> {
    try {
      const order = await this.orderRepository.findByOrderNumber(orderNumber);
      if (!order) {
        return { success: false, message: "Order not found" };
      }

      return { success: true, message: "Order found", data: order };
    } catch (error: any) {
      return { success: false, message: error.message || "Failed to get order" };
    }
  }

  public async getOrdersByCustomer(customerId: string): Promise<ServiceResponse> {
    try {
      const orders = await this.orderRepository.findByCustomerId(customerId);
      return { success: true, message: "Orders retrieved successfully", data: orders };
    } catch (error: any) {
      return { success: false, message: error.message || "Failed to get orders" };
    }
  }

  public async getOrdersByVehicle(vehicleId: string): Promise<ServiceResponse> {
    try {
      const orders = await this.orderRepository.findByVehicleId(vehicleId);
      return { success: true, message: "Orders retrieved successfully", data: orders };
    } catch (error: any) {
      return { success: false, message: error.message || "Failed to get orders" };
    }
  }

  public async getAllOrders(): Promise<ServiceResponse> {
    try {
      const orders = await this.orderRepository.findAll();
      return { success: true, message: "Orders retrieved successfully", data: orders };
    } catch (error: any) {
      return { success: false, message: error.message || "Failed to get orders" };
    }
  }
}