import {prisma, Survey} from '../models/app'
import { Request, Response } from 'express';

enum Status{
    ok = 200,
    error_notfound = 404,
    error_server = 500,
    error_badrequest = 400
}

type QuestionOptionCreate = {
    description: string;
}

type QuestionCreate = {
    description: string;
    options: QuestionOptionCreate[];
}

type SurveyCreate = {
    id: number; // user id
    title: string;
    description?: string;
    questions: QuestionCreate[];
}

export const createSurvey = async (req:Request, res:Response)=>{
    try{
        const {id, title, description, questions}: SurveyCreate = req.body;
        const surveyId = await prisma.$transaction(async(txn)=>{
            const survey = await txn.survey.create({
                data:{
                    title:title,
                    description:description
                },
                select:{
                    id:true
                }
            });

            for(const i in questions){
                const {description, options}:QuestionCreate = questions[i];

                const que = await txn.question.create({
                    data:{
                        description:description,
                        surveyId: survey.id
                    },
                    select:{
                        id:true
                    }
                });

                for(const i in options){
                    const opt = await txn.questionOption.create({
                        data:{
                            description: options[i].description,
                            questionId: que.id
                        }
                    });
                }
            }

            return survey.id;
        })
        
        return res.status(Status.ok).send('Created survey: '+surveyId);
    }
    catch(e){
        if(e instanceof TypeError)
            return res.status(Status.error_badrequest).send('Invalid format: '+e.message);

        console.log(e)
        return res.status(Status.error_server).send('Server error');
    }
}

export const fetchAllSurveys = async (req:Request, res:Response)=>{
    try{
        const surveys = await Survey.findMany({
            select:{
                id:true,
                title:true,
                description:true,
                questions:{
                    select:{
                        description:true,
                        options:true
                    }
                }
            }
        })
        
        return res.json(surveys).status(Status.ok);
    }
    catch(e){
        return res.status(Status.error_server).send('Server error');
    }
}
