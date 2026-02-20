# SMGPUB℠ Platform v2.0.0

## Architecture Overview
A high-performance Music Publishing & Licensing platform built with Vite and optimized for Vercel Serverless.

### Core Components
- **Frontend**: Vite + Vanilla JS (Multi-page: Landing, Dashboard, Blog).
- **Security**: JWT-based Authentication with `Bearer` token header injection.
- **PWA**: `sw.js` (Service Worker) provides offline caching for artist assets.
- **Monetization**: Stripe API integration with automated Webhook handlers.
- **SEO**: Dynamic Producer Blog with automated metadata generation.

### Local Development
1. `npm install`
2. `npm run dev` (Proxies API calls to port 3000)

### Production Deployment
- **Branch**: `main`
- **Auto-Deploy**: Enabled via Vercel-GitHub integration.
- **Build Output**: `/dist`
