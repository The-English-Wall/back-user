import express from 'express';
import { router as userRouter } from "../modules/Users/users.route.js"

export const router = express.Router()

router.use("/users", userRouter)

