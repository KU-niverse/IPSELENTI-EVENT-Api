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
const helmet = require('helmet');
const hpp = require('hpp');
const redis = require('redis');
const RedisStore = require('connect-redis').default;

const userRoutes = require("./routes/user");
const commentRoutes = require("./routes/comment");
const wikiRoutes = require("./routes/wiki");
const eventRoutes = require("./routes/event");
const mypageRoutes = require("./routes/user/mypage");
const pointRoutes = require("./routes/user/point");
dotenv.config();
const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/0`,
  legacyMode: true, // 반드시 설정 !!
});
redisClient.on('connect', () => {
  console.info(`Redis connected`);
});
redisClient.on('error', (err) => {
  console.error(`Redis Client Error`, err);
});
redisClient.connect().then();
const redisCli = redisClient.v4;

const app = express();
passportConfig();

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
  app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false,
  }),
  );
  app.use(hpp());
} else {
  app.use(morgan("dev"));
}

const corsOptions = {
  origin: "http://localhost:3000", // 클라이언트 앱의 URL을 입력하세요.
  credentials: true,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookiParser(process.env.COOKIE_SECRET));
const sessionOption = {
  //secret: 'secret',
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  },
  store: new RedisStore({ client: redisClient, prefix: 'session: ', db: 0 }),
};
if (process.env.NODE_ENV === 'production') {
  sessionOption.proxy = true;
  sessionOption.cookie.secure = true;
}
app.use(session(sessionOption));
app.use(passport.initialize());
app.use(passport.session());

app.use("/user", userRoutes);
app.use("/comment", commentRoutes);
app.use("/wiki", wikiRoutes);
app.use("/event", eventRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;