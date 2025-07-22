import { FastifyInstance } from "fastify";
import { ValidateTokenController } from "@/modules/shared/http/controllers/validate-token-controller";

export async function sharedModuleRoutes(app: FastifyInstance) {
  app.get("/token/:code/validate", ValidateTokenController.handle);
}
