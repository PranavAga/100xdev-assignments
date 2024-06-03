import { Hono } from 'hono'
import apiV1 from './routes'

const app = new Hono()

app.route('/api/v1',apiV1)

export default app
