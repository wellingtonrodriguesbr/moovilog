import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import fastifyCors from "@fastify/cors";

import { vehiclesRoutes } from "@/http/routes/vehicles";
import { freightsRoutes } from "@/http/routes/freights";
import { companyMembersRoutes } from "@/http/routes/company-members";
import { routesInCompanyRoutes } from "@/http/routes/routes-in-company";
import { citiesRoutes } from "@/http/routes/cities";
import { areasRoutes } from "@/http/routes/areas";

import { authModuleRoutes } from "@/modules/auth/http/routes/auth-module-routes";
import { userModuleRoutes } from "@/modules/user/http/routes/user-module-routes";
import { companyModuleRoutes } from "@/modules/company/http/routes/company-module-routes";
import { vehicleModuleRoutes } from "@/modules/vehicle/http/routes/vehicle-module-routes";
import { driverModuleRoutes } from "@/modules/driver/http/routes/driver-module-routes";
import { routeModuleRoutes } from "@/modules/route/http/routes/route-module-routes";
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

app.register(companyMembersRoutes);
app.register(vehiclesRoutes);
app.register(freightsRoutes);
app.register(routesInCompanyRoutes);
app.register(citiesRoutes);
app.register(areasRoutes);

app.register(authModuleRoutes);
app.register(userModuleRoutes);
app.register(companyModuleRoutes);
app.register(vehicleModuleRoutes);
app.register(driverModuleRoutes);
app.register(routeModuleRoutes);
app.register(sharedModuleRoutes);
