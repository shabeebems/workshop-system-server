import { CustomerRepository } from "../../../repositories/implementations/customer.repositories";
import { ICustomerService } from "../interfaces/customer.interface";
import { ServiceResponse } from "../../auth/interfaces/auth.interface";
import { CreateCustomerInput, UpdateCustomerInput } from "../../../schemas/customer.schema";
import { generateCustomerCode } from "../../../utils/customerCode";

export class CustomerService implements ICustomerService {
  private customerRepository = new CustomerRepository();

  public async createCustomer(data: CreateCustomerInput): Promise<ServiceResponse> {
    try {
      let code;
      let existingCustomer;
      do {
        code = generateCustomerCode();
        existingCustomer = await this.customerRepository.findByUniqueCode(code);
      } while (existingCustomer);
      
      const customer = await this.customerRepository.create({ ...data, uniqueCode: code });
      return { success: true, message: "Customer created successfully", data: customer };
    } catch (error: any) {
      return { success: false, message: error.message || "Failed to create customer" };
    }
  }

  public async updateCustomer(uniqueCode: string, data: UpdateCustomerInput): Promise<ServiceResponse> {
    try {
      const customer = await this.customerRepository.findByUniqueCode(uniqueCode);
      if (!customer) {
        return { success: false, message: "Customer not found" };
      }

      const updatedCustomer = await this.customerRepository.updateById(customer._id, data);
      return { success: true, message: "Customer updated successfully", data: updatedCustomer };
    } catch (error: any) {
      return { success: false, message: error.message || "Failed to update customer" };
    }
  }
  
  public async searchCustomers(searchTerm: string): Promise<ServiceResponse> {
    try {
      const customers = await this.customerRepository.searchCustomers(searchTerm);
      return { success: true, message: "Search completed", data: customers };
    } catch (error: any) {
      return { success: false, message: error.message || "Failed to search customers" };
    }
  }

  public async getCustomerByUniqueCode(uniqueCode: string): Promise<ServiceResponse> {
    try {
      const customer = await this.customerRepository.findByUniqueCode(uniqueCode);
      if (!customer) {
        return { success: false, message: "Customer not found" };
      }

      return { success: true, message: "Customer found", data: customer };
    } catch (error: any) {
      return { success: false, message: error.message || "Failed to get customer" };
    }
  }

  public async getAllCustomers(): Promise<ServiceResponse> {
    try {
      const customers = await this.customerRepository.findAll();
      return { success: true, message: "Customers retrieved successfully", data: customers };
    } catch (error: any) {
      return { success: false, message: error.message || "Failed to get customers" };
    }
  }
}