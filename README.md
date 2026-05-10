# HandleChecker

Check username availability across Twitter/X, Twitch, and TikTok.

🔗 **Live:** [handlechecker.vercel.app](https://handlechecker.vercel.app/)

## Supported Platforms

| Platform | Method | Rate Limits |
|----------|--------|-------------|
| **Twitter/X** | Official API (`/2/users/by/username`) | 3 requests / 15 min |
| **Twitch** | Helix API (`/users`) | Standard Twitch rate limits |
| **TikTok** | Web scraping (profile page parse) | None (best effort) |

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/xingtianma/handlechecker.git
cd handlechecker
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```env
TWITCH_CLIENT_ID=your_client_id
TWITCH_CLIENT_SECRET=your_client_secret
TWITCH_ACCESS_TOKEN=your_access_token
TWITTER_BEARER_TOKEN=your_bearer_token
```

### 3. Run

**Web server:**

```bash
npm run serve
```

Open [http://localhost:3000](http://localhost:3000)

**CLI:**

```bash
npm start <handle>
```

**Example output:**

```json
{
  "handle": "coolname123",
  "twitch": { "available": true },
  "tiktok": { "available": true },
  "twitter": { "available": false }
}
```

### Return Values

| Value | Meaning |
|-------|---------|
| `true` | Handle is available |
| `false` | Handle is taken |
| `null` | Could not determine (rate limited or error) |

## Project Structure

```
handlechecker/
├── api/
│   └── check/
│       └── [handle].js              # Vercel serverless function
├── public/
│   └── index.html                   # Web UI
├── src/
│   ├── index.js                     # CLI entry point
│   ├── server.js                    # Express dev server
│   ├── clients/
│   │   ├── twitter.client.js
│   │   ├── twitch.client.js
│   │   └── tiktok.client.js
│   └── services/
│       └── handle.service.js        # Orchestrates checks across all platforms
├── tests/
│   ├── test-twitter.js
│   ├── test-twitch.js
│   └── test-tiktok.js
├── vercel.json
├── .env                             # API credentials (git-ignored)
└── package.json
```

## Getting API Credentials

### Twitter/X
1. Apply for a [Twitter Developer account](https://developer.twitter.com/)
2. Create a project and app in the Developer Portal
3. Generate a **Bearer Token** under "Keys and Tokens"

### Twitch
1. Register an application at the [Twitch Developer Console](https://dev.twitch.tv/console/apps)
2. Note your **Client ID** and **Client Secret**
3. Generate an app access token:
   ```bash
   curl -X POST "https://id.twitch.tv/oauth2/token" \
     -d "client_id=YOUR_CLIENT_ID" \
     -d "client_secret=YOUR_CLIENT_SECRET" \
     -d "grant_type=client_credentials"
   ```

### TikTok

No credentials needed — the TikTok client uses web scraping.

## License

ISC
