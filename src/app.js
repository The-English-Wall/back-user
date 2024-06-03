import express from 'express';
import cors from 'cors';
import { router } from './routes/routes.js';
import { AppError, globalErrorHandler } from './errors/index.js';
import fileUpload from 'express-fileupload';

const app = express();

app.use(express.json());

app.use(cors());

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
    createParentPath: true
}));

app.use("/api/v1", router)

app.all("*", (req, res, next) => {
    next(new AppError(`cant find ${req.originalUrl} on this server!`, 404))
})

app.use(globalErrorHandler)

export default app;
