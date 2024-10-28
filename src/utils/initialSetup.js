import { roleModel } from "../models/roleModel.js";

export const createRoles = async () => {


    const roles = await roleModel.find()
    if (roles.length <= 0) {
   const data = await roleModel.insertMany([
        {
            name: "user"
        },
        {
            name: "admin"
        }
    ])
    console.log("Roles created-->",data)

}else{
    console.log("Roles already exist",roles)
}



}