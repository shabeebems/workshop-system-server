import { Request, Response } from "express";
import { HttpStatus } from "../../constants/statusCode";
import { Messages } from "../../constants/messages";
import { CustomerService } from "../../services/workshop/implementations/customer.service";

export class CustomerController {
  private customerService = new CustomerService();

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

  public createCustomer = (req: Request, res: Response): Promise<void> =>
    this.handleRequest(res, () => this.customerService.createCustomer(req.body));

  public updateCustomer = (req: Request, res: Response): Promise<void> =>
    this.handleRequest(res, () => this.customerService.updateCustomer(req.params.uniqueCode, req.body));
  
  public searchCustomers = (req: Request, res: Response): Promise<void> =>
    this.handleRequest(res, () => this.customerService.searchCustomers(req.query.search as string));
  
  public getCustomerByUniqueCode = (req: Request, res: Response): Promise<void> =>
    this.handleRequest(res, () => this.customerService.getCustomerByUniqueCode(req.params.uniqueCode));

  public getAllCustomers = (req: Request, res: Response): Promise<void> =>
    this.handleRequest(res, () => this.customerService.getAllCustomers());
}