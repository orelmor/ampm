import { NextFunction,Request,Response } from "express";
import protection from "../2-utils/protection";
import { ValidationErrorModel } from "../4-models/error-models";

async function verifyLoggedIn(request: Request, response: Response, next: NextFunction) {

    try {

        const isAuthorized = await protection.verifyToken(request)
        if(!isAuthorized){
            throw new ValidationErrorModel("Invalid token")
            next()
        }
        
    } catch (err:any) {
        next(err)
    }
    
}

export default verifyLoggedIn