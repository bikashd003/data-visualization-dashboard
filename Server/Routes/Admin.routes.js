import { Register } from "../Controllers/Admin.controller.js";
import { Router } from "express";


const AdminRouter = Router();
AdminRouter.post("/auth/google", Register);
export default AdminRouter;