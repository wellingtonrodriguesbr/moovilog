import { FastifyInstance } from "fastify";
import { ValidateTokenController } from "@/modules/shared/http/controllers/validate-token-controller";
import { FetchCitiesByAreaController } from "@/modules/shared/http/controllers/fetch-cities-by-area-controller";
import { FetchAreasByStatesController } from "@/modules/shared/http/controllers/fetch-areas-by-states-controller";

export async function sharedModuleRoutes(app: FastifyInstance) {
	app.get("/token/:code/validate", ValidateTokenController.handle);
	app.get("/:areaCode/cities", FetchCitiesByAreaController.handle);
	app.get("/areas", FetchAreasByStatesController.handle);
}
