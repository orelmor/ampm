import { OkPacket } from "mysql"
import dal from "../2-utils/dal"
import { UnauthorizedErrorModel, ValidationErrorModel } from "../4-models/error-models"
import RoleModel from "../4-models/role-model"
import UserModel from "../4-models/user-model"
import protection from "../2-utils/protection"
import CredentialsModel from "../4-models/credentials-model"

async function getAllUsers():Promise<UserModel[]>{
    const sql = `SELECT * FROM users`
    const users = await dal.execute(sql)
    return users
}


async function register(user:UserModel):Promise<string> { //Returns token
    const error = user.validate()
    if(error) throw new ValidationErrorModel(error)

    // IF username is taken throw val error
    const users = await getAllUsers()

    if(users.some(u=> u.username === user.username)){
        throw new ValidationErrorModel("Username is already taken")
    }


    // Define new user's role
    user.role = RoleModel.User

    // Add new user to sql table
    const sql  = `INSERT INTO users VALUES(DEFAULT,?,?,?,?,?)`
    const info:OkPacket = await dal.execute(sql,[user.firstName,user.lastName,user.username,user.password,user.role])

    user.id = info.insertId

    try {
        const token = await protection.getNewToken(user)
        return token
        
    } catch (err:any) {
        throw new UnauthorizedErrorModel(err.message)
        
    }

    

}

async function login(credentials:CredentialsModel):Promise<string> {
    const error = credentials.validate()
    if(error) throw new ValidationErrorModel(error)


    const users = await getAllUsers()
    // const user = users.find(u => u.username === credentials.username && u.password === credentials.password)

    const sql =`SELECT * FROM users WHERE username=? AND password=?`
    const response = await dal.execute(sql,[credentials.username,credentials.password])
    const user = response[0]

    if(!user) throw new UnauthorizedErrorModel("Incorrect username or password, Please try again")

    // Generate Token 
    const token = await protection.getNewToken(user)

    return token
}


export default{
    getAllUsers,
    register,
    login
}

