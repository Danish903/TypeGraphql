import { Resolver, Query, Mutation, Arg } from "type-graphql";
import bcrypt from "bcryptjs";
import { User } from "../../entity/User";
import { RegisterInput } from "./register/RegisterInput";

@Resolver(User)
class RegisterResolver {
   @Query(() => String)
   async helloWorld() {
      // fake async in this example
      return "Hello World";
   }

   @Mutation(() => User)
   async register(@Arg("data")
   {
      email,
      firstName,
      lastName,
      password
   }: RegisterInput): Promise<User> {
      const hashedPassword = await bcrypt.hash(password, 12);
      return User.create({
         firstName,
         lastName,
         email,
         password: hashedPassword
      }).save();
   }
}

export { RegisterResolver as default };
