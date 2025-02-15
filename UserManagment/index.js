import cookieParser from "cookie-parser";
import express, { json } from "express"
import { configDotenv } from "dotenv";
import { ConnectDB } from "./src/Utils/db.Utils.js";
import { userRotue } from "./src/routes/User.rotue.js";
import { authRoute } from "./src/routes/Auth.route.js";
import cors from 'cors'
const app = express();

configDotenv();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: "*", // Use 127.0.0.1 instead of localhost
    methods: ["GET", "POST","PUT","DELETE"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true,
}));

app.use(authRoute)
app.use(userRotue)

app.listen(process.env.PORT, () => {
    console.log("Server running on :", process.env.PORT);
    ConnectDB();
})
