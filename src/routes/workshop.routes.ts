import { Router } from "express";
import { CustomerController } from "../controllers/workshop/customer.controller";
import { VehicleController } from "../controllers/workshop/vehicle.controller";
import { OrderController } from "../controllers/workshop/order.controller";
import { authenticateToken } from "../middlewares/tokenValidation";
import { validate } from "../middlewares/zodValidate";
import { 
  createCustomerSchema, 
  updateCustomerSchema 
} from "../schemas/customer.schema";
import { 
  createVehicleSchema, 
  updateVehicleSchema 
} from "../schemas/vehicle.schema";
import { 
  createOrderSchema, 
  updateOrderSchema
} from "../schemas/order.schema";

const workshopRouter: Router = Router();

// Initialize controllers
const customerController = new CustomerController();
const vehicleController = new VehicleController();
const orderController = new OrderController();

// Customer routes
workshopRouter.post('/customers', 
  authenticateToken(['admin']), 
  validate(createCustomerSchema), 
  customerController.createCustomer
);

workshopRouter.put('/customers/:uniqueCode', 
  authenticateToken(['admin']), 
  validate(updateCustomerSchema), 
  customerController.updateCustomer
);

workshopRouter.get('/customers/search', 
  authenticateToken(['admin']), 
  customerController.searchCustomers
);

workshopRouter.get('/customers/:uniqueCode', 
  authenticateToken(['admin']), 
  customerController.getCustomerByUniqueCode
);

workshopRouter.get('/customers',
  authenticateToken(['admin']), 
  customerController.getAllCustomers
);

// Vehicle routes
workshopRouter.post('/vehicles',
  authenticateToken(['admin']),
  validate(createVehicleSchema),
  vehicleController.createVehicle
);

workshopRouter.put('/vehicles/:vehicleNumber', 
  authenticateToken(['admin']), 
  validate(updateVehicleSchema), 
  vehicleController.updateVehicle
);

workshopRouter.get('/vehicles/search', 
  authenticateToken(['admin']), 
  vehicleController.searchVehicles
);

workshopRouter.get('/vehicles/:vehicleNumber', 
  authenticateToken(['admin']), 
  vehicleController.getVehicleByNumber
);

workshopRouter.get('/vehicles', 
  authenticateToken(['admin']), 
  vehicleController.getAllVehicles
);

// Order routes
workshopRouter.post('/orders', 
  authenticateToken(['admin']), 
  validate(createOrderSchema), 
  orderController.createOrder
);

workshopRouter.put('/orders/:orderNumber', 
  authenticateToken(['admin']), 
  validate(updateOrderSchema), 
  orderController.updateOrder
);

workshopRouter.get('/orders/:orderNumber', 
  authenticateToken(['admin']), 
  orderController.getOrderByNumber
);

workshopRouter.get('/orders/customer/:customerId', 
  authenticateToken(['admin']), 
  orderController.getOrdersByCustomer
);

workshopRouter.get('/orders/vehicle/:vehicleId', 
  authenticateToken(['admin']), 
  orderController.getOrdersByVehicle
);

workshopRouter.get('/orders', 
  authenticateToken(['admin']), 
  orderController.getAllOrders
);

export default workshopRouter;