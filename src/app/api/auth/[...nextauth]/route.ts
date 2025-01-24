import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

const loginWithApi= async (values:Record<any,any>|undefined) => {
    if(!values) return null;
    if(values?.email === 'user@email.com' && values?.password === 'password'){
        return {
            id:"1",
            name:"user name",
            email:"user@email.com",
            accessToken:"Access Token for logged in user"
        }
    }
    return null
}

export const authOptions:AuthOptions = {
    providers:[
        CredentialsProvider({
            id:"login",
            name:"login",
            credentials:{},
            async authorize(credentials, req){
                const user = await loginWithApi(credentials);
                console.log("login authorize user ==================== user", user)
                if(user?.id) return user;
                return null;
             
            }
        }),
        CredentialsProvider({
            id:"signup",
            name:"signup",
            credentials:{},
            async authorize(credentials, req){
                return {
                    id:"1",
                    name:"user name",
                    email:"user@email.com"
                }
            }
        })
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
        // async signIn({ user, account, profile, email, credentials }) {
        //     console.log("\n user =========================== user \n", user)
        //     console.log("\n user =========================== account \n", account)
        //     return true
        // },
        async jwt({ token, user, account, profile, isNewUser }) {
            console.log("\n jwt =========================== token \n", token)
            console.log("\n jwt =========================== user \n", user)
            // console.log("\n jwt =========================== account \n", account)
            if(user && 'accessToken' in user){
                token.accessToken = user.accessToken ?? null;
                token.user = user;
            }
            console.log("\n jwt =========================== token \n", token)
            return token
        },
        async session({ session, user, token }) {
            // console.log("\n session =========================== session \n", session)
            // console.log("\n session =========================== user \n", user)
            console.log("\n session =========================== token \n", token)
            session.user ={
                ...session.user,
                accessToken:token.accessToken || null
            } as CustomUser;
            return session
        },
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }


type CustomUser = {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
    accessToken?: string | null | undefined;
  }