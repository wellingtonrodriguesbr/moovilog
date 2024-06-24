import { FastifyInstance } from "fastify";
import { registerUserController } from "../controllers/register-user-controller";
import { authenticateController } from "../controllers/authenticate-controller";
import { refreshController } from "../controllers/refresh-token";
import { getProfileController } from "../controllers/get-profile-controller";
import { verifyJWT } from "../middlewares/verify-jwt";
import { logoutController } from "../controllers/logout-controller";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", registerUserController);
  app.post("/sessions", authenticateController);
  app.patch("/token/refresh", refreshController);
  app.post("/logout", logoutController);

  app.get("/me", { onRequest: [verifyJWT] }, getProfileController);
}
