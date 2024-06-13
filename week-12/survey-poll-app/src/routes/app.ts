import express, { Router } from "express";
import surveyRouter from './surveyRoutes'

const app = Router();

app.use('/surveys',surveyRouter)

export default app;