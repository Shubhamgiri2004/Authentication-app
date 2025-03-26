import { Request, Response } from "express";
import User, { IUser } from "../models/userModel";
import { generateToken } from "../utils/jwtUtils";


// writing a interface 
interface RegisterUserRequest {
    username: string,
    email: string,
    password: string
}

const registerUser = async (req: Request<RegisterUserRequest>, res: Response) => {
    try {
        const { username, email, password } = req.body;

        //to check if userExists
        const userExists = await User.findOne({ email });
        if (!userExists) return res.status(400).json({
            message: "User is already exist"
        })

        const newUser: IUser = await User.create({ username, email, password });
        if (newUser) {
            res.status(201).json({
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                message: "User created successfully"
            })
        } else {
            res.status(400).json({
                message: "User can't created"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: (error as Error).message
        });
    }
}


