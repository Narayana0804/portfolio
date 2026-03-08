# Lakshmi Narayana Swamy - AI Portfolio

A highly interactive, performance-optimized "High-Performance AI Lab" portfolio website built with the MERN stack (Next.js client + Express.js server).

## Features
- **Frontend**: Next.js (App Router), Tailwind CSS, Framer Motion, and global Command Palette (Cmd+K).
- **Backend**: Express.js with MongoDB to store Contact Form responses and AI Chat logs.
- **Interactive AI Chatbot**: A custom-built portfolio assistant with smart automated responses based on your CV data.
- **Animations**: Subtle glow interactions, typewriter effects, glassmorphic project cards, and scroll animations.
- **Vercel Ready**: A monorepo configuration fully optimized for immediate deployment on Vercel utilizing Vercel's Edge/Node Serverless capabilities.

## Local Setup Instructions

1. **Install Dependencies**
Since this is a monorepo, you need to install packages for both client and server:
   ```bash
   npm run build:server
   cd client && npm install
   ```
*(Alternatively, you can just run `npm install` inside the `client` and `server` folders.)*

2. **Environment Variables**
In the `server/` directory, create a `.env` file from the example:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   ```
*(If `MONGODB_URI` is omitted, the backend falls back to "Simulation Mode" logging directly to the console.)*

3. **Run the Development Server**
Start both client and server:
   ```bash
   # Terminal 1 - Start backend
   npm run dev:server
   
   # Terminal 2 - Start frontend
   npm run dev:client
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment on Vercel

This repository is pre-configured for Vercel Monorepo deployment via the `vercel.json` file.

1. Push your code to GitHub.
2. Sign in to [Vercel](https://vercel.com/) and create a **New Project**.
3. Import your GitHub repository.
4. **Important Settings during Import**:
   - **Framework Preset**: Vercel should automatically detect Next.js.
   - **Build & Development Settings**: Keep the defaults. The custom `vercel.json` routing configuration will handle the Express API implicitly without overriding the UI.
   - **Environment Variables**: Add your `MONGODB_URI` string here.
5. Click **Deploy**.

The Vercel configuration routes all `/api/*` traffic automatically to the `server/api/index.js` Express Application as serverless functions, whilst serving the Next.js `client/*` application for all other routes.
