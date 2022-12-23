import { NextFunction, Request, Response } from "express";

export default async function logsMiddleware(request: Request, response: Response, next: NextFunction){
    const {method, url} = request;
    const trace = `${method} ${url}`

    console.info(trace);
    console.time();
    await next();
    console.timeEnd();
}