import "@fastify/jwt";

declare module "@fastify/jwt" {
  export interface FastifyJWT {
    user: {
      documentNumber: string;
      email: string;
      sub: string;
    };
  }
}
