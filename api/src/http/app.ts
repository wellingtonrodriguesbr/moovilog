import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";

import { usersRoutes } from "./routes/users";
import { env } from "@/env";
import { companiesRoutes } from "./routes/companies";
import { driversRoutes } from "./routes/drivers";

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

app.register(usersRoutes);
app.register(companiesRoutes);
app.register(driversRoutes);
