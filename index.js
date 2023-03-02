import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import { dataBaseConnection } from "./db.js";
import { signupRouter } from "./routes/signupuser.js";
import { loginRouter } from "./routes/loginUser.js";
import { isSignedIn } from "./controllers/auth.js";
import { contentRouter } from "./routes/content.js";

//env configurations
dotenv.config();

//db base connections 
dataBaseConnection();

const app = express(); 
const PORT = process.env.PORT

// middlewares 
app.use(express.json());
app.use(cors()); 

app.use("/api/content", isSignedIn, contentRouter)
app.use("/api/signup", signupRouter)
app.use("/api/login", loginRouter)
app.listen(PORT, ()=>console.log(`Server is up and running in port ${PORT}`))