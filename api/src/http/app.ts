import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import fastifyCors from "@fastify/cors";

import { authModuleRoutes } from "@/modules/auth/http/routes/auth-module-routes";
import { userModuleRoutes } from "@/modules/user/http/routes/user-module-routes";
import { companyModuleRoutes } from "@/modules/company/http/routes/company-module-routes";
import { companyMemberModuleRoutes } from "@/modules/company-member/http/routes/company-member-module-routes";
import { vehicleModuleRoutes } from "@/modules/vehicle/http/routes/vehicle-module-routes";
import { driverModuleRoutes } from "@/modules/driver/http/routes/driver-module-routes";
import { routeModuleRoutes } from "@/modules/route/http/routes/route-module-routes";
import { freightModuleRoutes } from "@/modules/freight/http/routes/freight-module-routes";
import { sharedModuleRoutes } from "@/modules/shared/http/routes/shared-module-routes";

import { env } from "@/env";

export const app = fastify({
	logger: true,
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
	origin: process.env.CORS_ORIGIN_URL,
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
app.register(sharedModuleRoutes);
