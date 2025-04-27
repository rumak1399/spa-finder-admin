import { AuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import axios from "axios";

// Define the User type as it comes from your backend
interface BackendUser {
	message: string;
	user: {
		name: string;
		email: string;
		role: string;
		image: string;
	};
}

// NextAuth configuration
const authOptions: AuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
		}),
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" },
			},
			//@ts-expect-error no error
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					throw new Error("Email and password are required.");
				}

				try {
					const response = await axios.post<{ user: BackendUser }>(
						`${process.env.NEXT_PUBLIC_BACKEND_HOST_URI}/login`,
						{
							email: credentials.email,
							password: credentials.password,
						}
					);
					console.log("res", response);
					if (response.data.user) {
						return response.data.user;
					}

					return null;
				} catch (error: unknown) {
					throw new Error(String(error) || "Invalid credentials.");
				}
			},
		}),
	],

	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.name = user.name;
				token.email = user.email;
				token.role = user.role;
				token.image = user.image;
			}
			return token;
		},

		async session({ session, token }) {
			if (token) {
				session.user = {
					...session.user,
					role: token.role as "user" | "admin",
				};
			}
			return session;
		},
	},

	secret: process.env.NEXTAUTH_SECRET as string,

	session: {
		strategy: "jwt",
		maxAge: 10 * 60 * 60, // 10 hours
	},

	pages: {
		signIn: "/login",
		signOut: "/admin/login",
		error: "/error",
	},

	debug: process.env.NODE_ENV === "development",
};

const getSession = () => getServerSession(authOptions);

export { authOptions, getSession };
