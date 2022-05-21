import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayLoad {
    sub: string;
}


export async function ensureAuthenticateUser(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        return response.status(401).json({
            message: "Token Missing",
        })
    }

    // bearer token

    const [, token] = authHeader.split(" ")

    try {
        const { sub } = verify(token, "7EBD1F63E01B1B4802AD923B18AC2097") as IPayLoad;
        console.log(sub);

        request.id = sub;

        return next();

    } catch (err) {
        return response.status(401).json({
            message: "Invalid Token!",
        });
    }


}
