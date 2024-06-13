import { FastifyInstance } from "fastify";
import { registerUserController } from "../controllers/register-user-controller";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", registerUserController);
}
