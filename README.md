# Twitch User Count API

Provides a simple API to get channel information about a twitch channel, especially for view count.

### REST-API

#### Get Channel Info

`/api/channelinfo`

Returns some Info about a channel. Response-Details differs, wether it's currently streaming or not.

- URL Params:
    - `channel` - the requested channel-name, e.g. 'twitch'
- Example Request:
    -  ```curl 'http://localhost:3000/api/channelinfo?channel=twitch'```

#### Limits

Requests are limited to 50 requests per 15 Minutes per IP

## Setup

1. Create an Application at https://dev.twitch.tv/ 
2. Add OAuth Client + Secret to `.env` File (See `.env-sample`)
3. Set Channels in `.env` file (comma seperated, if you want to server the api for several channels)
4. Install dependencies with `npm install`

## Run

Run with `npm start` or `node .`

## Develop

Run with `npm run develop` to have nodemon watch for changes
