import { FastifyInstance } from "fastify";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { SendInvitationToCompanyMemberController } from "@/http/controllers/send-invitation-to-company-member-controller";

export async function companyMembersRoutes(app: FastifyInstance) {
	app.addHook("onRequest", verifyJWT);

	app.post(
		"/:companyId/members",
		SendInvitationToCompanyMemberController.handle
	);
}
