# R6Stats Feature Walkthrough

This document provides a walkthrough of the newly implemented Rainbow 6 Siege stats tracking feature in the Tracer App.

## 1. Prerequisites

Before using the feature, ensure you have configured your Ubisoft credentials.
Create a `.env.local` file in the project root with the following content:

```env
UBI_EMAIL=your_email@example.com
UBI_PASSWORD=your_password
```

These credentials are used by the backend to authenticate with Ubisoft's API via `r6api.js`.

## 2. How It Works

The feature is built on a Next.js API route that acts as a proxy between the frontend and Ubisoft's servers.

### Backend (`src/app/api/r6stats/route.ts`)
- **Authentication**: Logs in using the provided credentials.
- **Data Fetching**: 
    1.  Attempts to use `r6api.js` (official-like API) if credentials are present.
    2.  If that fails or credentials are missing, falls back to a **Puppeteer Scraper** that visits the R6Tracker website directly.
    3.  If both fail, returns **Mock Data** to keep the UI functional.
- **Caching**: Implements an in-memory cache that stores player data for 10 minutes.
- **Runtime**: Uses Node.js runtime to support Puppeteer.

### Frontend (`src/app/overview/page.tsx`)
- **Search Interface**: Allows users to input a username and select a platform (PC, Xbox, PlayStation).
- **Data Display**: Fetches data from our local API (`/api/r6stats`) and displays it using the `PlayerStats` component.
- **Error Handling**: Gracefully handles errors and displays alerts if a player is not found.

## 3. Using the Feature

1.  **Start the App**: Run `npm run dev` to start the development server.
2.  **Navigate**: Go to [http://localhost:3000/overview](http://localhost:3000/overview).
3.  **Search**:
    -   Enter a valid Ubisoft username (e.g., `Spoit`or `Shaiiko`).
    -   Select the platform (default is `uplay` for PC).
    -   Click "Search".
4.  **View Results**: The player's Level, K/D, Win/Loss, Rank, MMR, and other stats will appear below the search bar.

## 4. Key Files

-   `src/app/api/r6stats/route.ts`: The core backend logic.
-   `src/app/overview/page.tsx`: The frontend page handling user interaction.
-   `.env.local`: Configuration file for credentials.

## 5. Troubleshooting

-   **"Players not found"**: Double-check the spelling of the username and the selected platform.
-   **"Failed to fetch stats"**: The API might be rate-limited or blocked. Check `error_log.txt` in the project root for detailed error messages.
-   **Environment Variables**: If you added `.env.local` while the server was running, you **MUST** restart the server (`npm run dev`) for the changes to take effect.
-   **Puppeteer Issues**: If the scraper fails, ensure you have a compatible Chrome/Chromium installed or that the server environment supports Puppeteer.
