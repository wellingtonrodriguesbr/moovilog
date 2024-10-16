import { FastifyInstance } from "fastify";
import { getUserProfileController } from "../controllers/get-user-profile-controller";
import { verifyJWT } from "../middlewares/verify-jwt";
import { logoutController } from "../controllers/logout-controller";
import { RegisterUserController } from "@/http/controllers/register-user-controller";
import { AuthenticateController } from "@/http/controllers/authenticate-controller";
import { RefreshToken } from "@/http/controllers/refresh-token";

export async function usersRoutes(app: FastifyInstance) {
	app.post("/users", RegisterUserController.handle);
	app.post("/sessions", AuthenticateController.handle);
	app.patch("/token/refresh", RefreshToken.handle);
	app.post("/logout", logoutController);

	app.get("/me", { onRequest: [verifyJWT] }, getUserProfileController);
}
