import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import { Prisma, PrismaClient } from '@prisma/client/edge'
import authenticate from './middlewares/authenticate'
import { withAccelerate } from '@prisma/extension-accelerate'

type UserID = {
    userId: number
}

type Bindings = {
    PRIVATE_KEY: string,
    DATABASE_URL:string,
    DIRECT_DATABASE_URL:string
}

const postRouter = new Hono<{ Variables: UserID,Bindings:Bindings }>();

const postSchema = z.object({
    title: z.string(),
    body: z.string()
})

postRouter.get('/',authenticate,async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const userId = c.get("userId");
    
    console.log("get:",userId)
    if(userId && typeof userId == 'number'){
        const user = await prisma.user.findUnique({
            where:{
                id: userId
            },
            select:{
                posts:true
            }
        })

        if(!user || user.posts.length>0){
            return c.json({
                message: 'No posts found'
            },400);
        }

        return c.json(user);
    }
    else{
        const posts = prisma.post.findMany({
            select:{
                id:true,
                title:true,
                body:true
            }
        });

        return c.json({posts:posts});
    }
});

postRouter.post('/',authenticate,zValidator('json',postSchema,(result, c) => {
    if (!result.success) {
        return c.text('Invalid input format', 400)
    }
}),async(c)=>{

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    if(!('userId' in c && typeof c.userId == 'number')){
        console.log()
        return c.json({
            message: 'Access denied'
        },400);
    }

    const body = c.req.valid("json");

    try {
        await prisma.post.create({
            data:{
                userId:c.userId,
                title:body.title,
                body:body.body
            }
        })

        return c.text('Post created!')
    } catch (e:any) {

        return c.text('Error while creating the post',400)
    }
    
});

export default postRouter;