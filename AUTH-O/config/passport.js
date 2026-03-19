

// import dotenv from "dotenv";

// dotenv.config({ path: "./.env" });
// import passport from "passport";
// import GoogleStrategy from "passport-google-oauth20";

// const googleAuthStrategy = GoogleStrategy.Strategy;

// passport.use(
//   new googleAuthStrategy(
//     {
//       clientID: process.env.CLIENTID,
//       clientSecret: process.env.CLIENTSECRET,
//       callbackURL: "http://localhost:5000/auth/google/redirect",
//     },

//     async (accessToken, refreshToken, profile, cb) => {
//       cb(null, profile);

//       console.log("profile", profile);
//     },
//   ),
// );




import dotenv from "dotenv "
dotenv.config({ path: "./.env"});

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENTID,
      clientSecret: process.env.CLIENTSECRET,
      callbackURL: "http://localhost:5000/auth/google/redirect",
    },
    async (accessToken, refreshToken, profile, cb) => {
      console.log("profile", profile);
      cb(null, profile);
    },
  ),
);

export default passport;