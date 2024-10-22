import { Router } from "express";
import userRouter from "./userSignin.js"

const router = Router()

router.use(userRouter)

export default router;