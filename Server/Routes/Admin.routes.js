import { Register,Login } from "../Controllers/Admin.controller.js";
import { Router } from "express";


const AdminRouter = Router();
AdminRouter.post("/auth/google/register", Register);
AdminRouter.post("/auth/google/login", Login);
export default AdminRouter;