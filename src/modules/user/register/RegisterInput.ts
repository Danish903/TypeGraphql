import { Length, IsEmail } from "class-validator";
import { InputType, Field } from "type-graphql";
import { IsEmailAlreadyExist } from "./isEmailArealdyUsed";

@InputType()
export class RegisterInput {
   @Field()
   @Length(3, 30)
   firstName: string;

   @Field()
   @Length(3, 30)
   lastName: string;

   @Field()
   @IsEmail()
   @IsEmailAlreadyExist({ message: "Email already in use!" })
   email: string;

   @Length(3)
   @Field()
   password: string;
}
