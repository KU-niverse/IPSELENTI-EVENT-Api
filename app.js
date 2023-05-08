const express = require("express");
const cookiParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const passport = require("passport");
const passportConfig = require("./passport");

const userRoutes = require("./routes/user");
/* const commentRoutes = require("./routes/comment");
const wikiRoutes = require("./routes/wiki");
const eventRoutes = require("./routes/event"); */
const mypageRoutes = require("./routes/mypage");

dotenv.config();
const app = express();

passportConfig();

app.use(morgan("dev"));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookiParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/user", userRoutes);
/* app.use("/comment", commentRoutes);
app.use("/wiki", wikiRoutes);
app.use("/event", eventRoutes);*/
app.use("/mypage", mypageRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
