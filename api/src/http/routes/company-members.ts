import { FastifyInstance } from "fastify";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { SendInvitationToCompanyMemberController } from "@/http/controllers/send-invitation-to-company-member-controller";
import { FetchCompanyMembersController } from "@/http/controllers/fetch-company-members-controller";

export async function companyMembersRoutes(app: FastifyInstance) {
	app.addHook("onRequest", verifyJWT);

	app.post("/members/invite", SendInvitationToCompanyMemberController.handle);
	app.get("/:companyId/members", FetchCompanyMembersController.handle);
}
