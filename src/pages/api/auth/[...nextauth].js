import NextAuth from 'next-auth';
import FacebookProvider from 'next-auth/providers/facebook';

const options = {
    providers: [
        FacebookProvider({
            clientId: process.env.NEXT_FACEBOOK_ID,
            clientSecret: process.env.NEXT_FACEBOOK_SECRET
        }),
    ],
    callbacks: {
        async jwt({ token, account }) {
            // Persist the OAuth access_token to the token right after signin
            if (account) {
                token.accessToken = account.access_token
            }
            return token
        },
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token from a provider.
            session.accessToken = token.accessToken
            return session
        }
    }

}

export default (req, res) => NextAuth(req, res, options)