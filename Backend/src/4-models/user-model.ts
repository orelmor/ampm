import RoleModel from "./role-model"
import Joi from "joi"

class UserModel {   
    public id: number
    public firstName:string
    public lastName:string
    public userName:string
    public password:string
    public role:RoleModel

    public constructor(user:UserModel){
        this.id =user.id
        this.firstName =user.firstName
        this.lastName =user.lastName
        this.userName =user.userName
        this.password =user.password
        this.role =user.role
    }

    public static validationSchema = Joi.object({
        id:Joi.number().optional().integer().positive(),
        firstName: Joi.string().required().min(2).max(25),
        lastName: Joi.string().required().min(2).max(25),
        userName: Joi.string().required().min(2).max(25),
        password: Joi.string().required().min(2).max(25)
    })

    public validate():string{
        const result = UserModel.validationSchema.validate(this)
        return result.error?.message
    }


}

export default UserModel