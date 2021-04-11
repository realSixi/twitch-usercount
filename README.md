# Twitch User Count API

Provides a simple API to get channel information about a twitch channel, especially for view count.

#### Routes

`/api/channelinfo`
returns info about a (configured) channel

#### Limits

Requests are limited to 50 requests per 15 Minutes per IP

## Setup

1. Create an Application at https://dev.twitch.tv/ 
2. Add OAuth Client + Secret to `.env` File (See `.env-sample`)
3. Set Channel in `.env` file 
4. Install dependencies with `npm install`

## Run

Run with `npm start` or `node .`

## Develop

Run with `npm run develop` to have nodemon watch for changes
