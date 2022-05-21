import { Request, Response } from "express";
import { UpdateUser } from "./UpdateUser";




export class UpdateUserController {
    async handle(request: Request, response: Response) {
        const { id } = request;
        const { password } = request.body;


        const updateUser = new UpdateUser;
        const user = await updateUser.execute({
            id,
            password
        });
        return response.json(user);

    }
}