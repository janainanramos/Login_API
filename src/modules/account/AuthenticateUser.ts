import { prisma } from "../../database/prismaClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";


interface IAuthenticateUser {
    email: string;
    password: string;
}


export class AuthenticateUser {
    async execute({ email, password }: IAuthenticateUser) {

        const user = await prisma.users.findFirst({
            where: {
                email: email
            }
        })

        if (!user) {
            throw new Error(" email or password invalid!")
        }

        const passwordCompare = await compare(password, user.password);

        if (!passwordCompare) {
            throw new Error(" email or password invalid!")
        }

        const token = sign({ email }, "7EBD1F63E01B1B4802AD923B18AC2097", {
            subject: user.id,
            expiresIn: "1d"
        })

        return token

    }
}