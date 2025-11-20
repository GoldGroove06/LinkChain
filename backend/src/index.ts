import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import authRoute from "./routes/authRoute";
import workspaceRoute from "./routes/workspaceRoute";
import automationRoute from "./routes/automationRoute";

const secret = process.env.JWT_SECRET ?? "a santa at nasa";
const app = express();

app.use(cors({
  credentials: true,
  origin: "http://localhost:5173"
}));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/log-out", (_req: Request, res: Response) => {
  res.clearCookie("token");
  res.redirect("/");
});

function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
): Response | void {
  const token = req.cookies?.token;

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const decoded = jwt.verify(token, secret) as string | JwtPayload;
    req.user = decoded;
    return next();
  } catch (err) {
    return res.sendStatus(403);
  }
}

app.use("/auth-check", authenticateToken, (_req: Request, res: Response) => {
  res.status(200).json({ message: "Authenticated" });
});

app.use("/auth", authRoute);
app.use("/workspace", authenticateToken, workspaceRoute);
app.use("/automation", authenticateToken, automationRoute);


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
