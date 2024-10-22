import z from "zod";

const envSchema = z.object({
	NODE_ENV: z
		.enum(["development", "test", "production"])
		.default("development"),
	DATABASE_URL: z.string(),
	CORS_ORIGIN: z.string(),
	COOKIE_SECRET_KEY: z.string(),
	COOKIES_DOMAIN: z.string(),
	PORT: z.coerce.number().default(3333),
	JWT_SECRET: z.string(),
	RESEND_API_KEY: z.string(),
	WEBSITE_DOMAIN_URL: z.string(),
	SENDER_EMAIL: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
	console.error("Invalid environment variables", _env.error.format());
	throw new Error("Invalid environment variables");
}

export const env = _env.data;
