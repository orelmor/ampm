import UserModel from "../4-models/user-model"
import jwt from "jsonwebtoken"
import { Request } from "express"
import RoleModel from "../4-models/role-model"


const secretKey = "lollyPop"

async function getNewToken(user: UserModel): Promise<string> {
    const container = { user }
    const options = { expiresIn: "3h" }
    const token = jwt.sign(container, secretKey, options)
    return token
}


async function verifyToken(request: Request): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {

        try {
            const header = request.header("authorization")
            if (!header) {
                resolve(false)
                return
            }

            const token = header.substring(7)
            if (!token) {
                resolve(false)
                return
            }

            jwt.verify(token, secretKey, err => {
                if (err) {
                    resolve(false)
                    return
                }
                resolve(true)

            })

        } catch (err: any) {
            reject(err)
        }

    })
}



async function verifyAdmin(request:Request):Promise<boolean> {

    const isLoggedIn = await verifyToken(request)

    if(!isLoggedIn){
        return false
    }

    const header = request.header("authorization")
    const token = header.substring(7)

    const container:any = jwt.decode(token)

    const user:UserModel  = container.user

    return user.role === RoleModel.Admin
}










export default {
    getNewToken,
    verifyToken,
    verifyAdmin
}