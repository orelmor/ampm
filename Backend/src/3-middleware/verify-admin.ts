import { NextFunction,Request,Response } from "express";
import protection from "../2-utils/protection";
import { UnauthorizedErrorModel, ValidationErrorModel } from "../4-models/error-models";

async function verifyAdmin(request: Request, response: Response, next: NextFunction) {

    try {

     const isAdmin = await protection.verifyAdmin(request)
     if(!isAdmin) throw new UnauthorizedErrorModel("You are not admin")
     next()
        
    } catch (err:any) {
        next(err)
    }
    
}

export default verifyAdmin