import axios from "axios";

export async function isTikTokHandleAvailable(handle) {
  try {
    const response = await axios.get(
      `https://www.tiktok.com/@${handle}`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0"
        },
        validateStatus: () => true
      }
    );

    // TikTok returns 404 or redirects if unavailable
    return response.status === 404;
  } catch (err) {
    console.error("TikTok error:", err.message);
    throw err;
  }
}
