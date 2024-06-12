import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import { Prisma, PrismaClient } from '@prisma/client/edge'
import { sign } from 'hono/jwt'
import { env } from 'hono/adapter'
import { withAccelerate } from '@prisma/extension-accelerate'

type Bindings = {
    PRIVATE_KEY: string,
    DATABASE_URL:string,
    DIRECT_DATABASE_URL:string
}

const userRouter = new Hono<{Bindings:Bindings }>();

const signupSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(3)
})

const signinSchema = z.object({
    email: z.string().email(),
    password: z.string()
})

userRouter.post('/signup', zValidator('json',signupSchema,(result, c) => {
        if (!result.success) {
        return c.text('Invalid input format', 400)
        }
    }), async(c) => {
        
    const body = c.req.valid("json");

    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate())

        await prisma.user.create({
            data:body
        })

        return c.text('Singedup!')
    } catch (e:any) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          if (e.code === 'P2002' && e.meta?.target){
            return c.text(e.meta.target+' already exisits',400)
          }
        }
        else{
            
        }
        return c.text('Error in creating a user',400)
    }
})

userRouter.post('/signin', zValidator('json',signinSchema,(result, c) => {
    if (!result.success) {
        return c.text('Invalid input format', 400)
    }
}), async(c) => {
    
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const body = c.req.valid("json");

    const user = await prisma.user.findUnique({
        where:{
            email:body.email,
            password:body.password
        },
        select:{
            id:true,
            username:true,
            password:true
        }
    })

    if(!user){
        return c.text('Invalid credentials',400);
    }

    const PRIVATE_KEY = c.env.PRIVATE_KEY
    const token = await sign(user,PRIVATE_KEY);

    return c.json({"token":token});

})

export default userRouter