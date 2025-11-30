# Tracer - Rainbow Six Siege Stats Tracker

Tracer is a modern, high-performance web application designed for Rainbow Six Siege players to track their statistics, analyze match history, and monitor rank progression.

## Features

*   **Player Search**: Look up any player by their Ubisoft username.
*   **Lifetime Stats**: View comprehensive career statistics including K/D ratio, Win Rate, and Headshot percentage.
*   **Seasonal History**: Track performance across different seasons with detailed breakdowns.
*   **Modern Design**: A sleek, "Apple-like" aesthetic with glassmorphism effects and smooth animations.
*   **Responsive Layout**: Optimized for both desktop and mobile devices.

## Tech Stack

*   **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Language**: TypeScript

## Getting Started

1.  Clone the repository:
    ```bash
    git clone git@github.com:DCy4/Tracer-App.git
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  **Configuration**:
    Create a `.env.local` file in the root directory and add your Ubisoft credentials. This is required for the stats API to function.
    ```env
    UBI_EMAIL=your_email@example.com
    UBI_PASSWORD=your_password
    ```

4.  Run the development server:
    ```bash
    npm run dev
    ```
5.  Open [http://localhost:3000](http://localhost:3000) with your browser.

## License

[MIT](LICENSE)
