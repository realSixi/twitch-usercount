import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
dotenv.config();
import { getChannelInfo } from "./twitch/twitchservice.js";

const { CHANNEL, PORT } = process.env;

const app = express();

const apiLimiter = rateLimit({
  windowMs: 1000 * 60 * 15,
  max: 50,
});


app.use(cors());

app.get("/api/channelinfo", apiLimiter, async (req, res) => {
  return res.send({ ...(await getChannelInfo(CHANNEL)) });
});

app.listen(PORT || 3000);
