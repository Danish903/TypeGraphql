import { Length, IsEmail } from "class-validator";
import { InputType, Field } from "type-graphql";
import { IsEmailAlreadyExist } from "./isEmailArealdyUsed";
import { PasswordInput } from "../../shared/PasswordInput";

@InputType()
export class RegisterInput extends PasswordInput {
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
}
