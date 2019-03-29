import { Resolver, Mutation, Arg, UseMiddleware, Query } from "type-graphql";
import bcrypt from "bcryptjs";
import { User } from "../../entity/User";
import { RegisterInput } from "./register/RegisterInput";

import { logger } from "../middleware/logger";
import { isAuth } from "../middleware/isAuth";
import { sendEmail } from "../utils/sendEmail";
import { createConfimationEmail } from "../utils/createConfirmationEmail";

@Resolver(User)
class RegisterResolver {
   @UseMiddleware(isAuth, logger)
   @Query(() => String)
   async helloWorld() {
      return "Hello World";
   }

   @UseMiddleware(logger)
   @Mutation(() => User)
   async register(@Arg("data")
   {
      email,
      firstName,
      lastName,
      password
   }: RegisterInput): Promise<User> {
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = await User.create({
         firstName,
         lastName,
         email,
         password: hashedPassword
      }).save();
      await sendEmail(user.email, await createConfimationEmail(user.id));
      return user;
   }
}

export { RegisterResolver as default };
