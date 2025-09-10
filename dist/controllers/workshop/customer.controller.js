"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerController = void 0;
const statusCode_1 = require("../../constants/statusCode");
const messages_1 = require("../../constants/messages");
const customer_service_1 = require("../../services/workshop/implementations/customer.service");
class CustomerController {
    constructor() {
        this.customerService = new customer_service_1.CustomerService();
        this.createCustomer = (req, res) => this.handleRequest(res, () => this.customerService.createCustomer(req.body));
        this.updateCustomer = (req, res) => this.handleRequest(res, () => this.customerService.updateCustomer(req.params.uniqueCode, req.body));
        this.searchCustomers = (req, res) => this.handleRequest(res, () => this.customerService.searchCustomers(req.query.search));
        this.getCustomerByUniqueCode = (req, res) => this.handleRequest(res, () => this.customerService.getCustomerByUniqueCode(req.params.uniqueCode));
        this.getAllCustomers = (req, res) => this.handleRequest(res, () => this.customerService.getAllCustomers());
    }
    async handleRequest(res, fn) {
        try {
            const { success, message, data } = await fn();
            const status = success ? statusCode_1.HttpStatus.OK : statusCode_1.HttpStatus.BAD_REQUEST;
            res.status(status).json({ success, message, data });
        }
        catch (error) {
            res.status(statusCode_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: messages_1.Messages.INTERNAL_SERVER_ERROR,
            });
        }
    }
}
exports.CustomerController = CustomerController;
