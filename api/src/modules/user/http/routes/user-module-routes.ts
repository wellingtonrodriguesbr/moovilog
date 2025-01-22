import { FastifyInstance } from "fastify";
import { verifyJWT } from "@/modules/shared/http/middlewares/verify-jwt";
import { GetUserProfileController } from "@/modules/user/http/controllers/get-user-profile-controller";
import { UpdateUserPasswordController } from "@/modules/user/http/controllers/update-user-password-controller";

export async function userModuleRoutes(app: FastifyInstance) {
	app.patch("/user/update-password", UpdateUserPasswordController.handle);

	app.get("/me", { onRequest: [verifyJWT] }, GetUserProfileController.handle);
}
