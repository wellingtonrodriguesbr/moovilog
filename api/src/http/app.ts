import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import fastifyCors from "@fastify/cors";

import { companiesRoutes } from "@/http/routes/companies";
import { driversRoutes } from "@/http/routes/drivers";
import { vehiclesRoutes } from "@/http/routes/vehicles";
import { freightsRoutes } from "@/http/routes/freights";
import { companyMembersRoutes } from "@/http/routes/company-members";
import { routesInCompanyRoutes } from "@/http/routes/routes-in-company";
import { citiesRoutes } from "@/http/routes/cities";
import { areasRoutes } from "@/http/routes/areas";

import { authModuleRoutes } from "@/modules/auth/http/routes/auth-module-routes";
import { userModuleRoutes } from "@/modules/user/http/routes/user-module-routes";
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

app.register(companiesRoutes);
app.register(companyMembersRoutes);
app.register(driversRoutes);
app.register(vehiclesRoutes);
app.register(freightsRoutes);
app.register(routesInCompanyRoutes);
app.register(citiesRoutes);
app.register(areasRoutes);

app.register(authModuleRoutes);
app.register(userModuleRoutes);
app.register(sharedModuleRoutes);
