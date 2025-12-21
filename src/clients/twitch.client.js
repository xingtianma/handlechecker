import axios from "axios";

const twitchClient = axios.create({
  baseURL: "https://api.twitch.tv/helix",
  headers: {
    "Client-ID": process.env.TWITCH_CLIENT_ID,
    "Authorization": `Bearer ${process.env.TWITCH_ACCESS_TOKEN}`
  },
  timeout: 5000
});

export async function isTwitchHandleAvailable(handle) {
  try {
    const response = await twitchClient.get("/users", {
      params: { login: handle }
    });

    return response.data.data.length === 0;
  } catch (err) {
    console.error("Twitch error:", err.response?.data || err.message);
    throw err;
  }
}
