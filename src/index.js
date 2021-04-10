import dotenv from "dotenv";
dotenv.config();
import express from "express";
import TwitchJs from "twitch-js";


const { CHANNEL } = process.env;
import { getChannelInfo } from "./twitch/twitchservice.js";

const app = express();

app.get("/", async (req, res) => {
  return res.send({ ...(await getChannelInfo(CHANNEL)) });
});

app.listen(3000);