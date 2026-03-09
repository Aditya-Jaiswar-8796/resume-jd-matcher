import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import connectDB from "@/db/db";
import User from "@/models/user.model"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        await connectDB();
        const { email, password} = credentials;

        console.log(email);
        console.log(password);
        const user = await User.findOne({email})
        
        if (!user) {
          return null;
        }
        console.log(user);

        return user;
      }
    })
  ]
};

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }