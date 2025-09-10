"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerService = void 0;
const customer_repositories_1 = require("../../../repositories/implementations/customer.repositories");
const customerCode_1 = require("../../../utils/customerCode");
class CustomerService {
    constructor() {
        this.customerRepository = new customer_repositories_1.CustomerRepository();
    }
    async createCustomer(data) {
        try {
            let code;
            let existingCustomer;
            do {
                code = (0, customerCode_1.generateCustomerCode)();
                existingCustomer = await this.customerRepository.findByUniqueCode(code);
            } while (existingCustomer);
            const customer = await this.customerRepository.create({ ...data, uniqueCode: code });
            return { success: true, message: "Customer created successfully", data: customer };
        }
        catch (error) {
            return { success: false, message: error.message || "Failed to create customer" };
        }
    }
    async updateCustomer(uniqueCode, data) {
        try {
            const customer = await this.customerRepository.findByUniqueCode(uniqueCode);
            if (!customer) {
                return { success: false, message: "Customer not found" };
            }
            const updatedCustomer = await this.customerRepository.updateById(customer._id, data);
            return { success: true, message: "Customer updated successfully", data: updatedCustomer };
        }
        catch (error) {
            return { success: false, message: error.message || "Failed to update customer" };
        }
    }
    async searchCustomers(searchTerm) {
        try {
            const customers = await this.customerRepository.searchCustomers(searchTerm);
            return { success: true, message: "Search completed", data: customers };
        }
        catch (error) {
            return { success: false, message: error.message || "Failed to search customers" };
        }
    }
    async getCustomerByUniqueCode(uniqueCode) {
        try {
            const customer = await this.customerRepository.findByUniqueCode(uniqueCode);
            if (!customer) {
                return { success: false, message: "Customer not found" };
            }
            return { success: true, message: "Customer found", data: customer };
        }
        catch (error) {
            return { success: false, message: error.message || "Failed to get customer" };
        }
    }
    async getAllCustomers() {
        try {
            const customers = await this.customerRepository.findAll();
            return { success: true, message: "Customers retrieved successfully", data: customers };
        }
        catch (error) {
            return { success: false, message: error.message || "Failed to get customers" };
        }
    }
}
exports.CustomerService = CustomerService;
