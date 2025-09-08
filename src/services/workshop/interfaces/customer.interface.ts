import { ServiceResponse } from "../../auth/interfaces/auth.interface";
import { CreateCustomerInput, UpdateCustomerInput } from "../../../schemas/customer.schema";

export interface ICustomerService {
  createCustomer(data: CreateCustomerInput): Promise<ServiceResponse>;
  updateCustomer(uniqueCode: string, data: UpdateCustomerInput): Promise<ServiceResponse>;
  getCustomerByUniqueCode(uniqueCode: string): Promise<ServiceResponse>;
  getAllCustomers(): Promise<ServiceResponse>;
  searchCustomers(searchTerm: string): Promise<ServiceResponse>;
}