import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050

const __dirname = path.resolve();

//app.use(cors());
//middleware, allows use to accept JSON data in req.body
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
}



app.listen(PORT, () =>{
    connectDB();
    console.log("Server started at http://localhost:"+ PORT);
})


