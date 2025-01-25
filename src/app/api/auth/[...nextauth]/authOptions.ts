import NextAuth, { AuthOptions , Session, DefaultSession} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { otpLogin } from "@/api-calls/auth/otpLogin";

export const authOptions:AuthOptions = {
    providers:[
        CredentialsProvider({
            id:"login",
            name:"login",
            credentials:{},
            async authorize(credentials, req){
                const user = await otpLogin((credentials as any)?.phone||"", (credentials as any)?.otp ||"");
                console.log("login authorize user ==================== user", user)
                if(user?.token?.value) return user;
                throw user;
            }
        }),

    ],
    secret:process.env.AUTH_SECRET,
    session:{
        maxAge:30*24*60*60
    },
    pages: {
        signIn: '/login',
        newUser: '/signup',
    },
    callbacks: {

        async jwt({ token, user, account, profile, isNewUser }) {
            // console.log("\n jwt =========================== token \n", token)
            // console.log("\n jwt =========================== user \n", user)
            if(user && (user as any)?.token?.value){
                console.log("==== in if ====")
                token.accessToken = (user as any).token?.value ?? null;
                // token.user = user;
            }
            // console.log("\n jwt =========================== token \n", token)
            return token
        },
        async session({ session, user, token }) {
            // console.log("\n session =========================== token \n", token)
            session.user ={
                ...session.user,
                accessToken:token.accessToken || null
            } as CustomUser;
            // console.log("\n session =========================== session \n", session)
            return session
        },
    }
}

type CustomUser = {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
    accessToken?: string | null | undefined;
  };
  
  // Extend the Session type
  declare module "next-auth" {
    interface Session {
      user: CustomUser;
    }
  }
  