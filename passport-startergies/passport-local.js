import passport from "passport";
import { Strategy } from "passport-local";
import { User } from '../modal/UserSchema.js'
import { comparePassword } from "../helpers/authHelper.js";


// Serialize user instance to store in session
passport.serializeUser((user, done) => {
  console.log("Serialize User");
  console.log(user);
  done(null, user.id);
});


// Deserialize user instance from session using user ID
passport.deserializeUser(async (id, done) => {
  console.log("Deserialize User");
  console.log("Deserialize User: ", id);
  try {
    const findUser = await User.findById(id);
    if (!findUser) throw new Error("User not found");
    done(null, findUser);
  } catch (error) {
    console.log(error);
    done(error, null);
  }
});


// Define local strategy for user authentication
export default passport.use(
  new Strategy(
    { usernameField: "email", passwordField: "password"},
    async (email, password, done) => {
      console.log(email, password);
      try {
        const findUser = await User.findOne({ email });
        if (!findUser) throw new Error("User not found");
        if (!comparePassword(password, findUser.password)) {
          throw new Error("Wrong password");
        }
        // Successful authentication
        done(null, findUser);
      } catch (error) {
        // Authentication failure
        console.log(error);
        done(error, null);
      }
    }
  )
);