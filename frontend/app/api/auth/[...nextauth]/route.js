import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

/***
 *  Add login provider options here
 *
 * The signIn callback handles creating user in db with POST request and returns user object
 * so that userId can be passed to jwt and session so we can access userId on client side
 */

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    // triggered by attempted login
    async signIn({ user, account, profile, email, credentials }) {
      // Not sure if twitter and google will provide same data format for user, account, profile, ect.
      // May have to conditionally handle each provider
      try {
        // console.log("user", user);
        // console.log("account", account);
        // console.log("profile", profile);
        // console.log("email", email);
        // console.log("credentials",credentials)

        // Make a request to backend to create or update the user
        const res = await fetch("http://localhost:8000/user/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: user.name,
            email: user.email,
            provider_id: account.providerAccountId,
            provider_name: account.provider,
          }),
        });

        // refactor this
        if (res.ok) {
          const userData = await res.json();
          user.id = userData.id;
          console.log("signIn USER", user);
          return user;
        } else {
          return false;
        }
      } catch (err) {
        console.log("signIn error", err);
        throw new Error("Failed to sign in...");
      }
    },
    // triggered whenever a jwt is created or updated (at login or session update)
    async jwt({ token, account, user }) {
      console.log("JWT user", user);
      console.log("JWT account", account);
      if (account) {
        token.id = user.id;
      }
      return token;
    },
    // triggered whenever session is updated
    async session({ session, token }) {
      console.log("session callback SESSION", session);
      session.user.id = token.id;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
