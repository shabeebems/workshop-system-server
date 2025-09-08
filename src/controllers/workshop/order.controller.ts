import { Request, Response } from "express";
import { HttpStatus } from "../../constants/statusCode";
import { Messages } from "../../constants/messages";
import { OrderService } from "../../services/workshop/implementations/order.service";

export class OrderController {
  private orderService = new OrderService();

  private async handleRequest<T>(
    res: Response,
    fn: () => Promise<{ success: boolean; message: string; data?: T }>
  ): Promise<void> {
    try {
      const { success, message, data } = await fn();
      const status = success ? HttpStatus.OK : HttpStatus.BAD_REQUEST;
      res.status(status).json({ success, message, data });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: Messages.INTERNAL_SERVER_ERROR,
      });
    }
  }

  public createOrder = (req: Request, res: Response): Promise<void> =>
    this.handleRequest(res, () => this.orderService.createOrder(req.body));

  public updateOrder = (req: Request, res: Response): Promise<void> =>
    this.handleRequest(res, () => this.orderService.updateOrder(req.params.orderNumber, req.body));

  public getOrderByNumber = (req: Request, res: Response): Promise<void> =>
    this.handleRequest(res, () => this.orderService.getOrderByNumber(req.params.orderNumber));

  public getOrdersByCustomer = (req: Request, res: Response): Promise<void> =>
    this.handleRequest(res, () => this.orderService.getOrdersByCustomer(req.params.customerId));

  public getOrdersByVehicle = (req: Request, res: Response): Promise<void> =>
    this.handleRequest(res, () => this.orderService.getOrdersByVehicle(req.params.vehicleId));

  public getAllOrders = (req: Request, res: Response): Promise<void> =>
    this.handleRequest(res, () => this.orderService.getAllOrders());
}