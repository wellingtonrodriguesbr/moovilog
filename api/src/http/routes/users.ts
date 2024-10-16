import { FastifyInstance } from "fastify";
import { authenticateController } from "../controllers/authenticate-controller";
import { refreshController } from "../controllers/refresh-token";
import { getUserProfileController } from "../controllers/get-user-profile-controller";
import { verifyJWT } from "../middlewares/verify-jwt";
import { logoutController } from "../controllers/logout-controller";
import { RegisterUserController } from "@/http/controllers/register-user-controller";

export async function usersRoutes(app: FastifyInstance) {
	app.post("/users", RegisterUserController.handle);
	app.post("/sessions", authenticateController);
	app.patch("/token/refresh", refreshController);
	app.post("/logout", logoutController);

	app.get("/me", { onRequest: [verifyJWT] }, getUserProfileController);
}
