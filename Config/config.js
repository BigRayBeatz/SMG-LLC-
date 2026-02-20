// src/config.js
export const CONFIG = {
  // Replace with your actual Vercel production URL or localhost:3000 for dev
  API_BASE: window.location.hostname === 'localhost' 
    ? 'http://localhost:3000/api' 
    : 'https://smgpub-platform.vercel.app/api',
  FRONTEND_VERSION: '2.0.0',
  STRIPE_PUBLIC_KEY: 'pk_live_your_key_here'
};
