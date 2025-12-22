import axios from "axios";

export async function isTikTokHandleAvailable(handle) {
  try {
    const { data } = await axios.get(`https://www.tiktok.com/@${handle}`, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
      timeout: 10000
    });

    const match = data.match(/<script id="__UNIVERSAL_DATA_FOR_REHYDRATION__" type="application\/json">(.*?)<\/script>/s);
    if (!match) return null;

    const json = JSON.parse(match[1]);
    const userDetail = json?.__DEFAULT_SCOPE__?.['webapp.user-detail'];
    if (!userDetail) return null;
    // console.log(userDetail);
    const { statusCode, userInfo } = userDetail;
    
    if (statusCode === 0 && userInfo?.user?.id) 
        return false; // taken
    if ([10202, 10221, 10223].includes(statusCode)) 
        return true; // available
    
    return null;
  } 
  catch (error) {
    return null;
  }
}