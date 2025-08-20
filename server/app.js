const cookieParser = require("cookie-parser");
const express = require("express");
const connectDB = require("./config/database");
const authRoute = require("./routes/auth.route");
const thoughtRoute = require("./routes/thoughts.route");
const audioRoute = require("./routes/audio.route");
const videoRoute = require("./routes/video.route");
const imageRoute = require("./routes/image.route");
const playlistRoute = require("./routes/playlist.route");
const profileRoute = require("./routes/profileDetails.route");
const cors = require("cors");
const predictionRoute = require("./routes/prediction.route");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOption = {
  origin: "https://starlock.onrender.com",
  credentials: true,
};
app.use(cors(corsOption));

app.use("/api/starlock/auth", authRoute);
app.use("/api/starlock/thought", thoughtRoute);
app.use("/api/starlock/audio", audioRoute);
app.use("/api/starlock/video", videoRoute);
app.use("/api/starlock/image", imageRoute);
app.use("/api/starlock/playlist", playlistRoute);
app.use("/api/starlock/prediction", predictionRoute);
app.use("/api/starlock/profile", profileRoute);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on ${PORT}`);
});
