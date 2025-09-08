import { IOrder } from "../../models/order.model";
import { IBaseRepository } from "./base.interface";

export interface IOrderRepository extends IBaseRepository<IOrder> {
  findByOrderNumber(orderNumber: string): Promise<IOrder | null>;
  findByCustomerId(customerId: string): Promise<IOrder[]>;
  findByVehicleId(vehicleId: string): Promise<IOrder[]>;
}