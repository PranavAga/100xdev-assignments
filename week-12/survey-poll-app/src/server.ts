import { port } from "./config";
import express from 'express';
import apiV1 from './routes/app'
import cors from 'cors'

const app = express();

// app.use(cors())
app.use(express.json());

app.get('/api/v1',(req,res)=>{
    return res.status(200).send('API V1 working');
});

app.use('/api/v1',apiV1);

app.listen(port,()=>{
    console.log("Listening at port: "+port)
})