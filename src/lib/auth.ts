import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { db } from "@/db";
import {
  account,
  session,
  user,
  verification,
} from "@/db/schema";

// Single source of truth for the auth base URL (public so the client can read
// it too). Falls back to the canonical site URL, then localhost for dev.
const baseURL =
  process.env.NEXT_PUBLIC_BETTER_AUTH_URL ??
  process.env.NEXT_PUBLIC_SITE_URL ??
  "http://localhost:3000";

export const auth = betterAuth({
  baseURL,
  secret: process.env.BETTER_AUTH_SECRET,
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: { user, session, account, verification },
  }),
  // Google OAuth only — no email/password accounts.
  emailAndPassword: { enabled: false },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  plugins: [nextCookies()],
  // Google-only: no email/password accounts, no self-service email or account
  // deletion endpoints exposed.
  user: {
    changeEmail: { enabled: false },
    deleteUser: { enabled: false },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 30, // 30 days
    updateAge: 60 * 60 * 24 * 7, // refresh weekly
  },
});

export type Session = typeof auth.$Infer.Session;
