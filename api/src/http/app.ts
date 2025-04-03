import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import fastifyCors from "@fastify/cors";
import fastifyCookie from "@fastify/cookie";
import fastifyRateLimit from "@fastify/rate-limit";

import { authModuleRoutes } from "@/modules/auth/http/routes/auth-module-routes";
import { userModuleRoutes } from "@/modules/user/http/routes/user-module-routes";
import { companyModuleRoutes } from "@/modules/company/http/routes/company-module-routes";
import { companyMemberModuleRoutes } from "@/modules/company-member/http/routes/company-member-module-routes";
import { vehicleModuleRoutes } from "@/modules/vehicle/http/routes/vehicle-module-routes";
import { driverModuleRoutes } from "@/modules/driver/http/routes/driver-module-routes";
import { routeModuleRoutes } from "@/modules/route/http/routes/route-module-routes";
import { freightModuleRoutes } from "@/modules/freight/http/routes/freight-module-routes";
import { financialModuleRoutes } from "@/modules/financial/http/routes/financial-module-routes";
import { sharedModuleRoutes } from "@/modules/shared/http/routes/shared-module-routes";

import { env } from "@/env";

export const app = fastify({
	logger: true,
});

app.register(fastifyRateLimit, {
	max: 100,
	timeWindow: "1 minute",
	keyGenerator: (request) => request.ip,
	errorResponseBuilder: (request, context) => {
		return { error: "Too many requests", retryIn: context.after };
	},
});

app.addHook("onRequest", async (request, reply) => {
	const referer = request.headers["referer"];
	const origin = request.headers["origin"];

	if (
		(!referer && !origin) ||
		(origin && !env.ALLOWED_ORIGIN_URL.includes(origin)) ||
		(referer && !referer.startsWith(env.ALLOWED_ORIGIN_URL))
	) {
		reply.code(403).send({ error: "Forbidden" });
	}
});

app.register(fastifyJwt, {
	secret: env.JWT_SECRET,
	cookie: {
		cookieName: "refreshToken",
		signed: false,
	},
	sign: {
		expiresIn: "7d",
	},
});

app.register(fastifyCookie, {
	secret: env.COOKIE_SECRET_KEY,
	hook: "onRequest",
});

app.register(fastifyCors, {
	origin: env.ALLOWED_ORIGIN_URL,
	credentials: true,
});

app.register(authModuleRoutes);
app.register(userModuleRoutes);
app.register(companyModuleRoutes);
app.register(companyMemberModuleRoutes);
app.register(vehicleModuleRoutes);
app.register(driverModuleRoutes);
app.register(routeModuleRoutes);
app.register(freightModuleRoutes);
app.register(financialModuleRoutes);
app.register(sharedModuleRoutes);
