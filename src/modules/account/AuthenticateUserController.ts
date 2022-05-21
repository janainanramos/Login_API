import { Request, Response } from "express";
import { AuthenticateUser } from "./AuthenticateUser";




export class AuthenticateUserController {
    async handle(request: Request, response: Response) {
        const { email, password } = request.body;

        const authenticateUser = new AuthenticateUser();

        const result = await authenticateUser.execute({
            email,
            password
        })


        return response.json(result);



    }
}