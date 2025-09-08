import OrderModel, { IOrder } from "../../models/order.model";
import { BaseRepository } from "./base.repositories";
import { IOrderRepository } from "../interfaces/order.interface";

export class OrderRepository
  extends BaseRepository<IOrder>
  implements IOrderRepository
{
  constructor() {
    super(OrderModel);
  }

  findByOrderNumber = (orderNumber: string): Promise<IOrder | null> =>
    this.model.findOne({ orderNumber }).populate(['customerId', 'vehicleId']);

  findByCustomerId = (customerId: string): Promise<IOrder[]> =>
    this.model.find({ customerId }).populate(['customerId', 'vehicleId']);

  findByVehicleId = (vehicleId: string): Promise<IOrder[]> =>
    this.model.find({ vehicleId }).populate(['customerId', 'vehicleId']);
}