import express  from "express";
import { createAppointment } from '../controllers/appointmetController.js'
import authMiddelware from "../middelware/authMiddleware.js";

const router = express.Router();

router.route('/')
  .post(authMiddelware,createAppointment)

export default router 