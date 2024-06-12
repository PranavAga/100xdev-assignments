import { verify } from 'hono/jwt'
import { createMiddleware } from 'hono/factory'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const AUTH_KEY = 'Authorization'
const PREFIX = 'Bearer '

type UserID = {
    userId: number,
}

type Bindings = {
    PRIVATE_KEY: string,
    DATABASE_URL:string,
    DIRECT_DATABASE_URL:string
}

const authenticate = createMiddleware<{ Variables: UserID, Bindings:Bindings }>(async (c, next) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    
    const authValue = c.req.header(AUTH_KEY)
    if (!(authValue && authValue.startsWith(PREFIX))) {
        return await next();
        return c.json({
            message: 'Invalid headers'
        },403);
    }

    const token = authValue.split(' ')[1];
    if(!token){
        return await next();
        return c.json({
            message: 'Invalid token'
        },403);
    }

    const PRIVATE_KEY = c.env.PRIVATE_KEY

    const decoded = await verify(token, PRIVATE_KEY);
    if(!decoded){
        return await next();
        return c.json({
            message: 'Invalid token'
        },403);
    }

    if(!('id' in decoded && typeof decoded.id == 'number')){
        return await next();
        return c.json({
            message: 'Invalid token'
        },403);
    }

    const user = await prisma.user.findUnique({
        where:{
            id:decoded.id
        },
        select:{
            id:true
        }
    });

    if(!user){
        return await next();
        return c.json({
            message: 'User not found'
        },400);
    }

    c.set("userId",decoded.id);
    console.log("Auth:",c.get("userId"))
    return await next();
})

export default authenticate; 