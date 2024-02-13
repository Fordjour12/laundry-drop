import { Router } from "express";
import {
    signInCompanyController,
    signUpCompanyController,
} from "./laundry/auth.controller";
import {
    signInUserController,
    signUpUserController,
} from "./user/auth.controller";

const AuthRouter = Router();

AuthRouter.get("/", (request, response) => {
    response.send(`<h1>Hello world from Express! This is the AuthRouter  </h1>`);
});


// AuthRouter for companies
AuthRouter.post("/company/signup", signUpCompanyController);
AuthRouter.post("/company/sign_in", signInCompanyController);

// AuthRouter for users
AuthRouter.post("/user/signup", signUpUserController);
AuthRouter.post("/user/sign_in", signInUserController);

export default AuthRouter;
