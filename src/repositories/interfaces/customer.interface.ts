import { ICustomer } from "../../models/customer.model";
import { IBaseRepository } from "./base.interface";

export interface ICustomerRepository extends IBaseRepository<ICustomer> {
  findByUniqueCode(uniqueCode: string): Promise<ICustomer | null>;
  findByMobile(mobile: string): Promise<ICustomer | null>;
  searchCustomers(searchTerm: string): Promise<ICustomer[]>;
}