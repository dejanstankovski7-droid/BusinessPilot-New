# BusinessPilot AI — MVP

A first responsive website for BusinessPilot AI, including an AI Marketing Assistant interface and a server-side AI endpoint.

## Run locally

1. Install Node.js (version 18 or newer).
2. In this folder, run `npm install`.
3. Copy `.env.example` to `.env` and add your API key.
4. Run `npm start`.
5. Open `http://localhost:3000`.

## Important

- The website interface works without an API key, but content generation requires an API key.
- Keep the API key on the server. Never paste it into `public/app.js` or other browser-side files.
- This is an MVP, not a finished paid SaaS. Accounts, subscriptions, payment processing, privacy/legal pages, analytics, and production security still need to be added before public commercial launch.
- The additional tool cards are planned features and are not active yet.
