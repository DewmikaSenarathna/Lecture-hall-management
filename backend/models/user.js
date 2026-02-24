import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email : {
            type : String,
            required : true,
            unique : true
        },
        /*
        firstName : {
            type : String,
            required : true,
        },
        lastName : {
            type : String,
            required : true
        },*/
         username: {
            type: String,
            required: true,
            unique: true
        },
        password : {
            type : String,
            required : true
        },
        role: {
            type: String,
            enum: ["PENDING", "STUDENT", "LECTURER", "HOD", "ADMIN"],
            default: "PENDING"
         },
        isEmailVerified : {
            type : Boolean,
            required : true,
            default : false
        },
        image : {
            type : String,
            default : "/images/default-profile.png"
        },
        role: {
            type: String,
            enum: ["PENDING", "STUDENT", "LECTURER", "HOD", "ADMIN"],
            default: "PENDING"
        },
        phone : {
            type : String,
            required : false
        }
         
    }
) 

const User = mongoose.model("User" , userSchema)

export default User