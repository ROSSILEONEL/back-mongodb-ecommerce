import mongoose from "mongoose";


const roleCollection = 'roles';

const roleSchema = new mongoose.Schema({
    name:String},{
        versionKey:false
    })

export const roleModel = mongoose.model(roleCollection, roleSchema)
