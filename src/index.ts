import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import RegisterResolver from "./modules/user/Register";
import LoginResolver from "./modules/user/Login";
import MeResolver from "./modules/user/Me";
import session from "express-session";
import connectRedis from "connect-redis";
import { redis } from "./redis";
import cors from "cors";

const main = async () => {
   await createConnection();
   const schema = await buildSchema({
      resolvers: [MeResolver, RegisterResolver, LoginResolver]
   });

   const server = new ApolloServer({
      schema,
      context: ({ req }: any) => ({ req })
   });

   const app = express();
   const RedisStore = connectRedis(session);
   app.use(
      cors({
         credentials: true,
         origin: "http://localhost:3000"
      })
   );

   app.use(
      session({
         store: new RedisStore({
            client: redis as any
         }),
         name: "qid",
         secret: "aslkdfjoiq12312",
         resave: false,
         saveUninitialized: false,
         cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 60 * 24 * 7 * 365 // 7 years
         }
      })
   );

   server.applyMiddleware({ app });

   app.listen({ port: process.env.PORT || 4000 }, () =>
      console.log(
         `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
      )
   );
};
main();
// Construct a schema, using GraphQL schema language
