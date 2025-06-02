import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = Schema({
    fullName: { type:String },
    email: { type: String },
    password: { type: String },
    createdOn: { type: Date, default: Date.now }
})

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

const User = mongoose.model("User", userSchema)

export default User;