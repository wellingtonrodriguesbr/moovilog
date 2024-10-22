import { FastifyInstance } from "fastify";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { RegisterUserController } from "@/http/controllers/register-user-controller";
import { AuthenticateController } from "@/http/controllers/authenticate-controller";
import { RefreshToken } from "@/http/controllers/refresh-token";
import { LogoutController } from "@/http/controllers/logout-controller";
import { GetUserProfileController } from "@/http/controllers/get-user-profile-controller";

export async function usersRoutes(app: FastifyInstance) {
	app.post("/users", RegisterUserController.handle);
	app.post("/sessions", AuthenticateController.handle);
	app.patch("/token/refresh", RefreshToken.handle);
	app.post("/logout", LogoutController.handle);

	app.get("/me", { onRequest: [verifyJWT] }, GetUserProfileController.handle);
}
