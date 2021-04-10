import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from 'cors';
import TwitchJs from "twitch-js";


const { CHANNEL, PORT } = process.env;
import { getChannelInfo } from "./twitch/twitchservice.js";

const app = express();
app.options('*', cors())

app.get("/api/channelinfo", cors(), async (req, res) => {
  return res.send({ ...(await getChannelInfo(CHANNEL)) });
});

app.listen(PORT || 3000);
