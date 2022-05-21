import { Request, Response } from "express";
import { CreateUser } from "./CreateUser";



export class CreateUserController {
    async handle(request: Request, response: Response) {
        const { name, email, password } = request.body;

        const createUser = new CreateUser();
        const result = await createUser.execute({
            name,
            email,
            password
        });
        return response.json(result);

    }
}