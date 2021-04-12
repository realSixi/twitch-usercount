import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
dotenv.config();
import { getChannelInfo } from "./twitch/twitchservice.js";
import StatusError from "./error.js";

const { CHANNELS, PORT } = process.env;

const allowedChannels = CHANNELS.split(",").map((c) => c.replace(/ /g, ""));

const app = express();

const apiLimiter = rateLimit({
  windowMs: 1000 * 60 * 15,
  max: 50,
});

app.get("/api/channelinfo", apiLimiter, async (req, res, next) => {
  try {
    const { channel = 'projektiontv' } = req.query;

    if (allowedChannels.indexOf(channel) === -1) {
      throw new StatusError(403, `Requested channel is not permitted`);
    }

    return res.send({ ...(await getChannelInfo(channel)) });
  } catch (e) {
    next(e);
  }
});

app.use(cors());

/*
  Error Handling: send error status or default (500)
*/
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: err.toString(),
    status: err.status || 500,
  });
});
app.listen(PORT || 3000);
