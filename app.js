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
const commentRoutes = require("./routes/comment");
const wikiRoutes = require("./routes/wiki");
const eventRoutes = require("./routes/event");
const mypageRoutes = require("./routes/user/myPage");

dotenv.config();
const app = express();

passportConfig();

app.use(morgan("dev"));
const corsOptions = {
  origin: "http://localhost:3000", // 클라이언트 앱의 URL을 입력하세요.
  credentials: true,
};

app.use(cors(corsOptions));

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
      sameSite: "lax",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());


app.use("/user", userRoutes);
app.use("/comment", commentRoutes);
app.use("/wiki", wikiRoutes);
app.use("/event", eventRoutes);
app.use("/mypage", mypageRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
