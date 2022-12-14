import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"
import dbConnect from "../../../lib/dbConnect"
import { compare } from "bcrypt";
import User from "../../../models/User";

export default NextAuth(  {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    // ...add more providers here
     // Email & Password
     CredentialsProvider({
        id: "credentials",
        name: "Credentials",
        credentials: {
          email: {
            label: "Email",
            type: "text",
          },
          password: {
            label: "Password",
            type: "password",
          },
        },
        async authorize(credentials) {
          await dbConnect();
  
          // Find user with the email
          const user = await User.findOne({
            email: credentials?.email, isEmailVerified: { $ne: false } 
          });

          
  
          // Email Not found
          if (!user) {
            throw new Error("Email is not registered/verified");
          }
  
          // Check hased password with DB hashed password
          const isPasswordCorrect = await compare(
            credentials!.password,
            user.password,
          );
  
          // Incorrect password
          if (!isPasswordCorrect) {
            throw new Error("Password is incorrect");
          }
      
          return user;
        },
      }),
  ],
  
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/',
  },
//   debug:  process.env.NODE_ENV,
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.role = user.role
      }
  // console.log(token);
  
      return token
    },
    async session({ session, token, user }) {
      // Add role value to user object so it is passed along with session
      if (session.user) {
        session.user.role = token.role;
      }
      // console.log(session)
      return session;
    },
    
  },
  
})


