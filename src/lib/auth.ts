import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Discord from "next-auth/providers/discord";
import { socialLogin, createVirtualKey } from "./gateway-client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, Discord],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (!account || !user.email) return false;

      try {
        // Gateway social login — creates user + FREE plan credits on first login
        await socialLogin(
          account.provider,
          user.email,
          user.name ?? undefined,
          user.image ?? undefined,
        );
      } catch {
        // Gateway might be down — allow login anyway, sync later
      }

      return true;
    },
    async jwt({ token, account }) {
      if (account) {
        token.provider = account.provider;
        token.providerAccountId = account.providerAccountId;
        token.gwUserId = `${account.provider}:${account.providerAccountId}`;
      }
      return token;
    },
    async session({ session, token }) {
      session.gwUserId = token.gwUserId as string;
      return session;
    },
  },
});

/**
 * Issue a gateway virtual key for the desktop app.
 * Called from the /callback flow.
 */
export async function issueDesktopKey(gwUserId: string): Promise<string> {
  const keyResponse = await createVirtualKey(gwUserId, `desktop-${gwUserId}`);
  return keyResponse.key;
}
