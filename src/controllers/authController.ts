import { Request, Response } from "express";
import User, { IUser } from "../models/userModel";
import { generateToken } from "../utils/jwtUtils";

interface RegisterUserRequest {
    username: string;
    email: string;
    password: string;
}

// User Registration
export const registerUser = async (req: Request<{}, {}, RegisterUserRequest>, res: Response): Promise<void> => {
    try {
        const { username, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400).json({ message: "User already exists" });
            return;
        }

        const newUser = await User.create({ username, email, password }) as IUser;
        if (newUser) {
            res.status(201).json({
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                message: "User created successfully"
            });
        } else {
            res.status(400).json({ message: "User could not be created" });
        }
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

// User Login
export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (user && (await user.comparePassword(password))) {
            res.json({
                _id: user.id,
                username: user.username,
                email: user.email,
                token: generateToken(user._id as string),
            });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};
