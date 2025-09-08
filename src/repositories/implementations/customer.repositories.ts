import CustomerModel, { ICustomer } from "../../models/customer.model";
import { BaseRepository } from "./base.repositories";
import { ICustomerRepository } from "../interfaces/customer.interface";

export class CustomerRepository
  extends BaseRepository<ICustomer>
  implements ICustomerRepository
{
  constructor() {
    super(CustomerModel);
  }

  findByUniqueCode = (uniqueCode: string): Promise<ICustomer | null> =>
    this.model.findOne({ uniqueCode });

  findByMobile = (mobile: string): Promise<ICustomer | null> =>
    this.model.findOne({ mobile });

  searchCustomers = (searchTerm: string): Promise<ICustomer[]> =>
    this.model.find({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { email: { $regex: searchTerm, $options: 'i' } },
        { mobile: { $regex: searchTerm, $options: 'i' } },
        { uniqueCode: { $regex: searchTerm, $options: 'i' } }
      ]
    });
}