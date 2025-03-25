import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";


//Load environment variables 
dotenv.config();

const app = express();

//adding middlewares 
app.use(cors({ origin: "http://localhost:5173", credentials: true}));
app.use(express.json());
app.use(cookieParser());


//routes
// app.use("/api/auth", authRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> {
    console.log(`Server is running on the port ${PORT}`)
});