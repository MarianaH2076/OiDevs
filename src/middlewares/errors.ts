import { NextFunction, Request, Response } from "express";

export default function errorsMiddleware(err: Error, request: Request, response: Response, next: NextFunction) {
    
    console.log(err)

    response.json({
        message: "Error!"
    });
}