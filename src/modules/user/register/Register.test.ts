import { testConn } from "../../../testUtils/testConn";
import { Connection } from "typeorm";

import { gCall } from "../../../testUtils/gCall";

let conn: Connection;
beforeAll(async () => {
   conn = await testConn();
});

afterAll(async () => {
   await conn.close();
});

const registerMutation = `
mutation Register($data: RegisterInput!){
   register(
     data: $data
   ) {
     id
     firstName
     lastName
     email
     name
   }
 }
`;

describe("Register", () => {
   test("create user", async () => {
      await gCall({
         source: registerMutation,
         variableValues: {
            data: {
               firstName: "bob",
               lastName: "Aob",
               email: "bob1234@gmail.com",
               password: "password"
            }
         }
      });
   });
});
