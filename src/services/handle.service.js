import { isTwitchHandleAvailable } from "../clients/twitch.client.js";
import { isTikTokHandleAvailable } from "../clients/tiktok.client.js";
import { isTwitterHandleAvailable } from "../clients/twitter.client.js";

export async function checkHandleAvailability(handle) {
  const [
    twitch,
    tiktok,
    twitter
  ] = await Promise.all([
    isTwitchHandleAvailable(handle),
    isTikTokHandleAvailable(handle),
    isTwitterHandleAvailable(handle)
  ]);

  return {
    handle,
    twitch: { available: twitch },
    tiktok: { available: tiktok },
    twitter: { available: twitter }
  };
}
