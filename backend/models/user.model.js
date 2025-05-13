import mongoose, { Schema } from "mongoose";

const userSchema = Schema({
    fullName: { type:String },
    email: { type: String },
    password: { type: String },
    createdOn: { type: Date, default: new Date() .getTime()}
})

 const User = mongoose.model("User", userSchema)

 export default User;