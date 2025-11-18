import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser"
import jwt from "jsonwebtoken"
import authRoute from "./routes/authRoute";
import bodyParser from 'body-parser'

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true               
}));

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/log-out", (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
});
app.get("/log-out", (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
});

function authenticateToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded; 
    next();
  } catch (err) {
    res.sendStatus(403);
  }
}
app.use("/auth-check", authenticateToken, (req, res) => {
  res.status(200).json({ message: "Authenticated" });
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const secret = 'a santa at nasa';


app.use(cookieParser());


app.use("/auth", authRoute)

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
