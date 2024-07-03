import { prismaClient } from "../lib/db"
import bcrypt from "bcryptjs"
import JWT from "jsonwebtoken"

export interface createUserPayload {
    firstName: string
    lastName: string
    email: string
    password: string
}

export interface loginUserPayload {
    email: string
    password: string
}

class UserService {
    public static createUser(payload: createUserPayload) {
        const { firstName, lastName, email, password } = payload
        if (!firstName || !lastName || !email || !password) {
            throw new Error('All fields are required')
        }

        if (password.length < 8) {
            throw new Error('Password must be at least 8 characters')
        }

        if (!email.includes('@')) {
            throw new Error('Invalid email')
        }

        // Hash password
        const hashedPassword = bcrypt.hashSync(password, 10)
        return prismaClient.user.create({ 
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword,
            }

         })
    }

    public static async getUserById(userId: string) {
        return prismaClient.user.findUnique({
            where: {
                id: userId
            }
        })
    }

    private static getUserByEmail(email: string) {
        return prismaClient.user.findUnique({
            where: {
                email
            }
        })
    }

    public static async getUser(payload: loginUserPayload) {
        const { email, password } = payload
        const user = await UserService.getUserByEmail(email)
        if (!user) {
            throw new Error('User not found')
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            throw new Error('Invalid password')
        }
        const token = JWT.sign({ userId: user.id, email: email }, process.env.JWT_SECRET as string, { expiresIn: '1d' })
        return { token, user }
    }

    public static verifyToken(token: string) {
        return JWT.verify(token, process.env.JWT_SECRET as string)
    }
}

export default UserService
    
    