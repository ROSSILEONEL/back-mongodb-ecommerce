import mongoose from "mongoose";

const userCollection= "user";

const userSchema =  mongoose.Schema({
    name: {
        type: String,
        required: true,
            },
    email: {
        type: String,
        required: true,
        index:true,
        unique: true,   
    },
    password: {
        type: String,
        required: true,
    },
    roles:[ 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'roles'
        }
    ]
},{
    timestamps: true,
    versionKey: false
});

export const userModel = mongoose.model(userCollection, userSchema);


