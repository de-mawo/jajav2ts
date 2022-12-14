import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import { Role } from "./types";

declare module "next-auth" {
  interface Session {
    user?: {
      role?: Role;
    } & DefaultSession["user"];
  }

  interface User {
        role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
  }
}
