import jwt from "jsonwebtoken";

export const generateToken = (id: string): string => {
    if(!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in the environment variables ");
    }

    if(!process.env.JWT_EXPIRY) {
        throw new Error("JWT_EXPIRY is not defined in the environment");
    }
   
    return jwt.sign({ id}, process.env.JWT_SECRET, 
        { expiresIn: Number(process.env.JWT_EXPIRY)}
    )
};


// return jwt.sigh({ id }, process.env.JWT_SECRET,
// {expireIn: Number(process.env.JWT_EXPIRY)})