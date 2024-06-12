import { Hono } from 'hono'
import userRouter from './users'
import postRouter from './posts'
const apiV1 = new Hono()

apiV1.route('/users',userRouter)
apiV1.route('/posts',postRouter)

export default apiV1