import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

let { TWITCH_CLIENT, TWITCH_SECRET } = process.env;

let _token = undefined;
let _expires = 0;

async function getToken() {
  if (_expires < Date.now()) {
    const {
      data: { access_token, expires_in },
    } = await axios.post(
      `https://id.twitch.tv/oauth2/token?client_id=${TWITCH_CLIENT}&client_secret=${TWITCH_SECRET}&grant_type=client_credentials`
    );

    _token = access_token;
    _expires = Date.now() + (expires_in - 30000); // 30 seconds safety
  }

  return _token;
}

export async function getChannelInfo(channel) {
  let {
    id: broadcaster_id,
    broadcaster_type,
    view_count,
    description,
    profile_image_url,
  } = await getUserByName(channel);

  let { data } = await axios.get(`https://api.twitch.tv/helix/streams`, {
    params: {
        user_id: broadcaster_id,
    },
    headers: {
      "Client-Id": TWITCH_CLIENT,
      Authorization: `Bearer ${await getToken()}`,
    },
  });


  let channelInfo = {
    ...data.data[0],
    broadcaster_type,
    view_count,
    description,
    profile_image_url,
  };


  return channelInfo;
}

async function getUserByName(name) {
  let { data } = await axios.get(`https://api.twitch.tv/helix/users`, {
    params: {
      login: name,
    },
    headers: {
      "Client-Id": TWITCH_CLIENT,
      Authorization: `Bearer ${await getToken()}`,
    },
  });
  return data.data[0];
}


