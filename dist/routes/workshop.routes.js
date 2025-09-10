"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customer_controller_1 = require("../controllers/workshop/customer.controller");
const vehicle_controller_1 = require("../controllers/workshop/vehicle.controller");
const order_controller_1 = require("../controllers/workshop/order.controller");
const tokenValidation_1 = require("../middlewares/tokenValidation");
const zodValidate_1 = require("../middlewares/zodValidate");
const customer_schema_1 = require("../schemas/customer.schema");
const vehicle_schema_1 = require("../schemas/vehicle.schema");
const order_schema_1 = require("../schemas/order.schema");
const workshopRouter = (0, express_1.Router)();
// Initialize controllers
const customerController = new customer_controller_1.CustomerController();
const vehicleController = new vehicle_controller_1.VehicleController();
const orderController = new order_controller_1.OrderController();
// Customer routes
workshopRouter.post('/customers', (0, tokenValidation_1.authenticateToken)(['admin']), (0, zodValidate_1.validate)(customer_schema_1.createCustomerSchema), customerController.createCustomer);
workshopRouter.put('/customers/:uniqueCode', (0, tokenValidation_1.authenticateToken)(['admin']), (0, zodValidate_1.validate)(customer_schema_1.updateCustomerSchema), customerController.updateCustomer);
workshopRouter.get('/customers/search', (0, tokenValidation_1.authenticateToken)(['admin']), customerController.searchCustomers);
workshopRouter.get('/customers/:uniqueCode', (0, tokenValidation_1.authenticateToken)(['admin']), customerController.getCustomerByUniqueCode);
workshopRouter.get('/customers', (0, tokenValidation_1.authenticateToken)(['admin']), customerController.getAllCustomers);
// Vehicle routes
workshopRouter.post('/vehicles', (0, tokenValidation_1.authenticateToken)(['admin']), (0, zodValidate_1.validate)(vehicle_schema_1.createVehicleSchema), vehicleController.createVehicle);
workshopRouter.put('/vehicles/:vehicleNumber', (0, tokenValidation_1.authenticateToken)(['admin']), (0, zodValidate_1.validate)(vehicle_schema_1.updateVehicleSchema), vehicleController.updateVehicle);
workshopRouter.get('/vehicles/search', (0, tokenValidation_1.authenticateToken)(['admin']), vehicleController.searchVehicles);
workshopRouter.get('/vehicles/:vehicleNumber', (0, tokenValidation_1.authenticateToken)(['admin']), vehicleController.getVehicleByNumber);
workshopRouter.get('/vehicles', (0, tokenValidation_1.authenticateToken)(['admin']), vehicleController.getAllVehicles);
// Order routes
workshopRouter.post('/orders', (0, tokenValidation_1.authenticateToken)(['admin']), (0, zodValidate_1.validate)(order_schema_1.createOrderSchema), orderController.createOrder);
workshopRouter.put('/orders/:orderNumber', (0, tokenValidation_1.authenticateToken)(['admin']), (0, zodValidate_1.validate)(order_schema_1.updateOrderSchema), orderController.updateOrder);
workshopRouter.get('/orders/:orderNumber', (0, tokenValidation_1.authenticateToken)(['admin']), orderController.getOrderByNumber);
workshopRouter.get('/orders/customer/:customerId', (0, tokenValidation_1.authenticateToken)(['admin']), orderController.getOrdersByCustomer);
workshopRouter.get('/orders/vehicle/:vehicleId', (0, tokenValidation_1.authenticateToken)(['admin']), orderController.getOrdersByVehicle);
workshopRouter.get('/orders', (0, tokenValidation_1.authenticateToken)(['admin']), orderController.getAllOrders);
exports.default = workshopRouter;
