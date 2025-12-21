import axios from "axios";

export async function isTwitterHandleAvailable(handle) {
  const res = await axios.get(
    `https://api.twitter.com/2/users/by/username/${handle}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
      },
      validateStatus: () => true,
    }
  );

  if (res.status === 429) {
    return null;
  }

  if (res.data?.data?.username) {
    return false;
  }

  if (
    Array.isArray(res.data?.errors) &&
    res.data.errors.some(e => e.title === "Not Found Error")
  ) {
    return true;
  }

  return false;
}
