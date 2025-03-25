import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

//first make a interface for typescript for not complaining
export interface IUser extends Document {
    username: string,
    email: string,
    password: string,
    comparePassword(enteredPassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true}
})


// Now hashing the password before saving
userSchema.pre<IUser>("save", async function(next) {
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

//comparing password method
userSchema.methods.comparePassword = async function(enteredPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.password)
};


const User =mongoose.model<IUser>("User", userSchema);
export default User;
