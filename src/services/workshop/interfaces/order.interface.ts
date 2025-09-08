import { ServiceResponse } from "../../auth/interfaces/auth.interface";
import { CreateOrderInput, UpdateOrderInput } from "../../../schemas/order.schema";

export interface IOrderService {
  createOrder(data: CreateOrderInput): Promise<ServiceResponse>;
  updateOrder(orderNumber: string, data: UpdateOrderInput): Promise<ServiceResponse>;
  getOrderByNumber(orderNumber: string): Promise<ServiceResponse>;
  getOrdersByCustomer(customerId: string): Promise<ServiceResponse>;
  getOrdersByVehicle(vehicleId: string): Promise<ServiceResponse>;
  getAllOrders(): Promise<ServiceResponse>;
}