// types/next-auth.d.ts
import { DefaultSession } from "next-auth";

// Extend the default user type
declare module "next-auth" {
	interface User {
		role: "user" | "admin";
	}

	interface Session {
		user: {
			role: "user" | "admin";
		} & DefaultSession["user"];
	}

	interface JWT {
		role: "user" | "admin";
	}
}
