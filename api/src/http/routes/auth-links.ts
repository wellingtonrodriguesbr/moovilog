import { FastifyInstance } from "fastify";
import { ValidateAuthLinkController } from "@/http/controllers/validate-auth-link-controller";

export async function authLinksRoutes(app: FastifyInstance) {
	app.get("/auth-link/:code/validate", ValidateAuthLinkController.handle);
}
