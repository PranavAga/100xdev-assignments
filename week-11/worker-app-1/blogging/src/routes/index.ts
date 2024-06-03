import { Hono } from 'hono'
import userRouter from './users'
const apiV1 = new Hono()

apiV1.route('/users',userRouter)

export default apiV1