import dotenv from "dotenv";
dotenv.config();
import express from "express";
import TwitchJs from "twitch-js";


const { CHANNEL, PORT } = process.env;
import { getChannelInfo } from "./twitch/twitchservice.js";

const app = express();

app.get("/api/channelinfo", async (req, res) => {
  return res.send({ ...(await getChannelInfo(CHANNEL)) });
});

app.listen(PORT || 3000);
