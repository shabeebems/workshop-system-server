import { Router } from "express";
import { AdminController } from "../controllers/admin/admin.controller";
import { authenticateToken } from "../middlewares/tokenValidation";

const adminRouter: Router = Router();

const adminController = new AdminController();

adminRouter.get('/check', authenticateToken(['admin']), adminController.check);

export default adminRouter;
