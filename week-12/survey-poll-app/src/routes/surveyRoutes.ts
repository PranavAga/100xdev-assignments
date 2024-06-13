import { Router } from "express";
import { createSurvey, fetchAllSurveys } from "../controllers/surveyControllers";

const router = Router();

router.post('',createSurvey);

router.get('',fetchAllSurveys);

export default router;