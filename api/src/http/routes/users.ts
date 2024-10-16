import { FastifyInstance } from "fastify";
import { refreshController } from "../controllers/refresh-token";
import { getUserProfileController } from "../controllers/get-user-profile-controller";
import { verifyJWT } from "../middlewares/verify-jwt";
import { logoutController } from "../controllers/logout-controller";
import { RegisterUserController } from "@/http/controllers/register-user-controller";
import { AuthenticateController } from "@/http/controllers/authenticate-controller";

export async function usersRoutes(app: FastifyInstance) {
	app.post("/users", RegisterUserController.handle);
	app.post("/sessions", AuthenticateController.handle);
	app.patch("/token/refresh", refreshController);
	app.post("/logout", logoutController);

	app.get("/me", { onRequest: [verifyJWT] }, getUserProfileController);
}
