import express from "express";
import bodyparser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import mutler from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { register } from "./controllers/auth.js";

/* CONFIGURATIONS */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
dotenv.config();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyparser.json( { limit : "30mb", extended: true }));
app.use(bodyparser.urlencoded({limit : "30mb", extended: true}));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets'))); /* set this directory where we keep our assets, i.e. our images */

/**FILE STORAGE */
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "public/assets");
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
});

const upload = multer({ storage });

/*ROUTES WITH FILES */
app.post("/auth/register",upload.single("picture"),register);



/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001; /* In case port 3001 is unresponsive, connect to 6001 */
mongoose.connect(process.env.MONGO_URL, {
    userNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
}).catch((error) => console.log(`${PORT} did not connect`))
