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

// user login 

const loginUse = async (req: Request, res:Response) =>{
    try{
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if(user && (await user.comparePassword(password))) {
            res.json({
                _id: user.id,
                username: user.username,
                email: user.email,
                token: generateToken(user._id as string),
            })
        }
        
    } catch( error ) {
        res.status(500).json({
            message: (error as Error).message
        });
    }
}
