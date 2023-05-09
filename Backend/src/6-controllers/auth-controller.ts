
import express, { Request,Response,NextFunction } from "express"
import UserModel from "../4-models/user-model"
import protection from "../2-utils/protection"
import authLogic from "../5-logic/auth-logic"
import CredentialsModel from "../4-models/credentials-model"
const authRouter = express.Router()



authRouter.get("/users",async (request:Request, response:Response,next:NextFunction)=>{
    try {
       const users = await authLogic.getAllUsers()
       response.status(200).json(users)
        
    } catch (err:any) {
        next(err)
    }
})

authRouter.post("/auth/register",async (request:Request, response:Response,next:NextFunction)=>{
    try {
        const user = new UserModel(request.body)
        const token = await authLogic.register(user)
        response.status(201).json(token)
        
    } catch (err:any) {
        next(err)
    }
})

authRouter.post("/auth/login",async (request:Request, response:Response,next:NextFunction)=>{
    try {
        const cred = new CredentialsModel(request.body)
        const token = await authLogic.login(cred)
        response.json(token)
        
    } catch (err:any) {
        next(err)
    }
})

export default authRouter