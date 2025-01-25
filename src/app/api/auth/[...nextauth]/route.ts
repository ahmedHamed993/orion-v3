import NextAuth, { AuthOptions , Session, DefaultSession} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { otpLogin } from "@/api-calls/auth/otpLogin";
import { authOptions } from "./authOptions";
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

