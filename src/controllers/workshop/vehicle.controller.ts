import { Request, Response } from "express";
import { HttpStatus } from "../../constants/statusCode";
import { Messages } from "../../constants/messages";
import { VehicleService } from "../../services/workshop/implementations/vehicle.service";

export class VehicleController {
  private vehicleService = new VehicleService();

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

  public createVehicle = (req: Request, res: Response): Promise<void> =>
    this.handleRequest(res, () => this.vehicleService.createVehicle(req.body));

  public updateVehicle = (req: Request, res: Response): Promise<void> =>
    this.handleRequest(res, () => this.vehicleService.updateVehicle(req.params.vehicleNumber, req.body));

  public searchVehicles = (req: Request, res: Response): Promise<void> =>
    this.handleRequest(res, () => this.vehicleService.searchVehicles(req.query.search as string));

  public getVehicleByNumber = (req: Request, res: Response): Promise<void> =>
    this.handleRequest(res, () => this.vehicleService.getVehicleByNumber(req.params.vehicleNumber));

  public getAllVehicles = (req: Request, res: Response): Promise<void> =>
    this.handleRequest(res, () => this.vehicleService.getAllVehicles());
}