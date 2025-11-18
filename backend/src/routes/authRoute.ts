import { Router } from "express"
import { getSignin, postSignin,  getSignup, postSignup } from "../controllers/authController"
import  emailCheck  from "../validators/createUserValidator"


const authRoute = Router()

authRoute.get("/signin", getSignin)
authRoute.post("/signin", postSignin)


authRoute.get("/signup", getSignup)
authRoute.post("/signup", emailCheck(), postSignup)

export default authRoute