const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/user");
const commentRoutes = require("./routes/comment");
const wikiRoutes = require("./routes/wiki");
const eventRoutes = require("./routes/event");
const mypageRoutes = require("./routes/mypage");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use("/user", userRoutes);
// app.use("/comment", commentRoutes);
app.use("/wiki", wikiRoutes);
// app.use("/event", eventRoutes);
// app.use("/mypage", mypageRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
