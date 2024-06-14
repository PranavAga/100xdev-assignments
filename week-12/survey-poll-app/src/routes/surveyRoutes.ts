import { Router } from "express";
import { createSurvey, deleteSurveyById, fetchAllSurveys, fetchSurveyById, updateSurveyById } from "../controllers/surveyControllers";

const router = Router();

router.post('',createSurvey);

router.get('',fetchAllSurveys);

router.get('/:id',fetchSurveyById);

router.put('/:id',updateSurveyById);

router.delete('/:id',deleteSurveyById);

export default router;