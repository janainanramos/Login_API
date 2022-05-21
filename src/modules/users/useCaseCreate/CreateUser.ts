import { prisma } from "../../../database/prismaClient";
import { hash } from "bcrypt";

interface ICreateUser {
    name: string;
    email: string;
    password: string
}



export class CreateUser {
    async execute({ name, email, password }: ICreateUser) {
        const userExist = await prisma.users.findFirst({
            where: {
                email: {
                    equals: email,
                    mode: "insensitive"
                }
            }
        })

        if (userExist) {
            throw new Error("Usuario já existente")
        }


        const hashPassword = await hash(password, 10);

        const user = await prisma.users.create({
            data: {
                name,
                email,
                password: hashPassword
            },
        });

        return user;
    }
}