import { FastifyInstance } from "fastify";
import { AuthenticateController } from "@/modules/auth/http/controllers/authenticate-controller";
import { LogoutController } from "@/modules/auth/http/controllers/logout-controller";
import { RefreshToken } from "@/modules/auth/http/controllers/refresh-token-controller";
import { RegisterUserController } from "@/modules/auth/http/controllers/register-user-controller";

export async function authModuleRoutes(app: FastifyInstance) {
	app.post("/sessions", AuthenticateController.handle);
	app.post("/sessions/logout", LogoutController.handle);
	app.patch("/token/refresh", RefreshToken.handle);

	app.post("/users", RegisterUserController.handle);
}
