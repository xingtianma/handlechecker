# HandleChecker

A CLI tool that checks username/handle availability across multiple social media platforms simultaneously.

## Supported Platforms

| Platform | Method | Rate Limits |
|----------|--------|-------------|
| **Twitter/X** | Official API (`/2/users/by/username`) | 3 requests / 15 min |
| **Twitch** | Helix API (`/users`) | Standard Twitch rate limits |
| **TikTok** | Web scraping (profile page parse) | None (best effort) |

## Prerequisites

- [Node.js](https://nodejs.org/) v18+
- API credentials for each platform (see [Configuration](#configuration))

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/xingtianma/handlechecker.git
cd handlechecker
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
# Twitch
TWITCH_CLIENT_ID=your_client_id
TWITCH_CLIENT_SECRET=your_client_secret
TWITCH_ACCESS_TOKEN=your_access_token

# Twitter / X
TWITTER_BEARER_TOKEN=your_bearer_token
TWITTER_ACCESS_TOKEN=your_access_token
TWITTER_ACCESS_SECRET=your_access_secret

# TikTok
TIKTOK_CLIENT_KEY=your_client_key
TIKTOK_CLIENT_SECRET=your_client_secret
```

## Usage

```bash
npm start <handle>
```

**Example:**

```bash
npm start coolname123
```

**Output:**

```json
{
  "handle": "coolname123",
  "twitch": { "available": true },
  "tiktok": { "available": true },
  "twitter": { "available": false }
}
```

### Return Values

Each platform returns one of three values:

| Value | Meaning |
|-------|---------|
| `true` | Handle is available |
| `false` | Handle is taken |
| `null` | Could not determine (rate limited or error) |

## Project Structure

```
handlechecker/
├── src/
│   ├── index.js                  # CLI entry point
│   ├── clients/
│   │   ├── twitter.client.js     # Twitter/X API client
│   │   ├── twitch.client.js      # Twitch Helix API client
│   │   └── tiktok.client.js      # TikTok web scraper client
│   └── services/
│       └── handle.service.js     # Orchestrates checks across all platforms
├── tests/
│   ├── test-twitter.js           # Twitter client test
│   ├── test-twitch.js            # Twitch client test
│   └── test-tiktok.js            # TikTok client test
├── public/                       # (Future) Web UI
├── .env                          # API credentials (git-ignored)
├── .gitignore
└── package.json
```

## Testing Individual Platforms

You can test each platform client in isolation:

```bash
node tests/test-twitter.js <handle>
node tests/test-twitch.js <handle>
node tests/test-tiktok.js <handle>
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
1. Register at the [TikTok Developer Portal](https://developers.tiktok.com/)
2. Create an app and obtain your **Client Key** and **Client Secret**

> **Note:** The TikTok client currently uses web scraping rather than the official API, so credentials are optional for basic functionality.

## License

ISC
