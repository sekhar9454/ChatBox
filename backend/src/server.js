import express from 'express'
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import {connectDB} from './lib/db.js';
import cookieParser  from "cookie-parser"


dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;
app.use(express.json());
app.use(cookieParser);

app.get("/code", (req, res) =>{
    res.send("API is running...");
    }
);
app.use("/api/auth", authRoutes);

app.listen(PORT , ()=>{
    console.log("listening on PORT:" , PORT);   
    connectDB();
})


// YZyDz5cHNUagRgc6