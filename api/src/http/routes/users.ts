import { FastifyInstance } from "fastify";
import { registerUserController } from "../controllers/register-user-controller";
import { authenticateController } from "../controllers/authenticate-controller";
import { refreshController } from "../controllers/refresh-token";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", registerUserController);
  app.post("/sessions", authenticateController);
  app.post("/token/refresh", refreshController);
}
