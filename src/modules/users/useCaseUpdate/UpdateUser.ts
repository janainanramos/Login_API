import { prisma } from "../../../database/prismaClient";
import { hash } from "bcrypt";

interface IUpdateUser {
    password: string
    id: string
}

export class UpdateUser {
    async execute({ password, id }: IUpdateUser) {

        const userExist = await prisma.users.findFirst({
            where: {
                id: id
            }
        })

        if (!userExist) {
            throw new Error("Usuario não logado")
        }


        const hashPassword = await hash(password, 10)

        const result = await prisma.users.update({
            where: {
                id: id
            },
            data: {
                password: hashPassword
            }
        })

        return result;
    }
}