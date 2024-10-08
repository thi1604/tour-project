import express, {Express, Request, Response} from "express";
// import { connectDatabase } from "./config/database";
import dotenv from "dotenv";
dotenv.config();
// import {prefixAdmin} from "./config/system";
// import {routesClient} from "./routes/client/index.route";
import bodyParser from "body-parser";
// import cookieParser from "cookie-parser";
import methodOverride from "method-override";
// import session from "express-session";
// import flash from "express-flash";
// import { routesAdmin } from "./routes/admin/index.route";
import path from "path";
const app : Express = express();
import sequelize from  "./config/database";
import { routeClient } from "./routes/client/index.route";
// import categoryModel from "./models/test.model";

// dotenv.config(); //Neu de cho nay, sequelize khong su dung duoc process.env vi chi bien dich tu dau den dong 15

app.use('/static', express.static(path.join(__dirname, 'public')))
app.set("views", "./views");
app.set('view engine', "pug");

sequelize; //Connect to my database

routeClient(app);

app.listen(3000, ()=> {
  console.log("Ket noi cong 3000");
});