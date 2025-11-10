import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

// Check if required environment variables are set
const hasGitHubOAuth = process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET;

if (!hasGitHubOAuth && process.env.NODE_ENV === "production") {
  console.warn("⚠️  GitHub OAuth credentials not configured. Authentication features will be disabled.");
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: hasGitHubOAuth
    ? [
        GitHub({
          clientId: process.env.GITHUB_CLIENT_ID!,
          clientSecret: process.env.GITHUB_CLIENT_SECRET!,
          authorization: {
            params: {
              scope: "public_repo",
            },
          },
        }),
      ]
    : [],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.accessToken) {
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
  pages: {
    error: "/auth/error",
  },
  debug: process.env.NODE_ENV === "development",
  // Add base path and trust host for Vercel
  trustHost: true,
});
