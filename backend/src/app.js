import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials:true
  })
);
app.use(
  express.json({
    limit: "16kb",
  })
);
app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);
app.use(express.static("/public"));

//import routes
import reelRouter from "./routes/reel.routes.js";
import userRouter from "./routes/user.routes.js";

app.use("/api/v1/reel", reelRouter);
app.use("/api/v1/user", userRouter);

export default app;
