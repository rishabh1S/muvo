# <img src="https://res.cloudinary.com/dnp36kqdc/image/upload/v1700767382/NextFlix/logo_pvnh62.png" width="90" height="30"> Netflix Clone - Your Amazing OTT

Welcome to Nextflix, a Netflix clone built with NextJS, MongoDB, Prisma, and more! This project aims to replicate the core features of Netflix, providing users with a seamless streaming experience.

<img src="https://res.cloudinary.com/dnp36kqdc/image/upload/v1700490888/CDN%20for%20portfolio/NextFlix_rbmftu.png" width="800">

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [License](#license)

## Features

- **Environment:** TypeScript, NextJS 14
- **Database:** MongoDB with Prisma for easy database connection and management
- **Authentication:** Utilizes NextAuth for authentication with support for Google and GitHub login
- **Responsive Design:** Fully responsive on all pages for an optimal viewing experience on various devices
- **Cookie-based Authentication:** Secure and efficient authentication using cookies
- **API and Controllers:** Creation of APIs and controllers for handling server-side logic
- **Detailed Effects and Animations:** Implements detail-oriented effects and animations using TailwindCSS
- **State Management:** Uses Zustand for efficient state management
- **Data Fetching:** Utilizes React SWR for efficient data fetching
- **Movies Database Integration:** Integrates with The Movie Database (TMDB) API for a vast collection of movies

## Prerequisites

Before you begin, ensure you have the following software and accounts set up:

- Node.js and npm: [Download and install Node.js](https://nodejs.org/)

- MongoDB: [Create Account](https://www.mongodb.com/cloud/atlas/register)

- Create a TMDB API key: [TMDB API](https://developer.themoviedb.org/reference/intro/getting-started)

## Getting Started

1. Create a .env.local file in the client directory and set the following environment variables:

`DATABASE_URL`
`GITHUB_ID`
`GITHUB_SECRET`
`GOOGLE_CLIENT_ID`
`GOOGLE_CLIENT_SECRET`
`SECRET`
`NEXT_PUBLIC_TMDB_API_URL`
`NEXT_PUBLIC_TMDB_API_KEY`

2. Install dependencies.
   ```bash
   npm install
   ```
3. Start the development server.
   ```bash
   npm run dev
   ```

4. Your Netflix Clone is now running locally.

## Deployment

You can deploy the project using platforms like Vercel or Netlify for the Next.js app.

## License

This project is licensed under the [MIT](https://github.com/rishabh1S/next-flix/blob/main/LICENSE).
