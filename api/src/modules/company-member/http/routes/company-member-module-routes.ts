import { FastifyInstance } from "fastify";
import { verifyJWT } from "@/modules/shared/http/middlewares/verify-jwt";
import { FetchMembersFromCompanyController } from "@/modules/company-member/http/controllers/fetch-members-from-company-controller";
import { SendInvitationToCompanyMemberController } from "@/modules/company-member/http/controllers/send-invitation-to-company-member-controller";

export async function companyMemberModuleRoutes(app: FastifyInstance) {
	app.addHook("onRequest", verifyJWT);

	app.get("/:companyId/members", FetchMembersFromCompanyController.handle);
	app.post(
		"/:companyId/members/invite",
		SendInvitationToCompanyMemberController.handle
	);
}
