import { NextFunction, Request, Response } from "express";
import logger from "../2-utils/logger";
import appConfig from "../2-utils/app-config";

function catchAll(err: any, request: Request, response: Response, next: NextFunction) {

    console.log(err)

    const status = err.status || 500

    if(status === 500){
        logger.logError("Catch all error",err);

    }

  

    const message = appConfig.isDevelopment ? err.message : "Some Error occoured, Please try again"

    // Send back the error to the front:
    response.status(status).send(message);
}

export default catchAll;

