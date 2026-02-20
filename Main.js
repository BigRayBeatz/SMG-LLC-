import { CONFIG } from './config.js';

const API = CONFIG.API_BASE;
const token = localStorage.getItem("token");

// --- GLOBAL UTILITIES ---
document.addEventListener('DOMContentLoaded', () => {
    const yearSpan = document.getElementById('year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
});

// --- AUTHENTICATION ---
window.login = async function() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password')?.value; // Optional based on UI
  
  try {
    const res = await fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    
    if (res.ok) {
      localStorage.setItem('token', data.token);
      window.location.href = "/dashboard"; // Clean URL handled by vercel.json
    } else {
      alert(data.message || "Login failed");
    }
  } catch (e) {
    console.error("Connection error:", e);
    alert("Simulation: Backend not reached. Check API_BASE in config.js");
  }
};

// --- SUBSCRIPTIONS (Stripe) ---
window.subscribe = async function() {
  try {
    const res = await fetch(`${API}/stripe/subscribe`, { 
        method: "POST",
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  } catch (err) {
    alert("Stripe Checkout would launch here in production.");
  }
};

// --- DASHBOARD DATA LOADING ---
if (token && window.location.pathname.includes("dashboard")) {
  loadDashboardData();
}

async function loadDashboardData() {
  try {
    const [royaltyRes, catalogRes] = await Promise.all([
      fetch(`${API}/royalty`, { headers: { Authorization: `Bearer ${token}` } }),
      fetch(`${API}/catalog`, { headers: { Authorization: `Bearer ${token}` } })
    ]);

    const royaltyData = await royaltyRes.json();
    const catalogData = await catalogRes.json();

    // Update Balance
    if (document.getElementById("totalBalance")) {
        document.getElementById("totalBalance").textContent = `$${royaltyData.total || '0.00'}`;
    }

    // Update Catalog Table
    const tableBody = document.getElementById("catalog-table-body");
    if (tableBody && catalogData.tracks) {
      tableBody.innerHTML = catalogData.tracks.map(t => `
        <tr>
          <td>${t.title}</td>
          <td>${t.isrc || 'Pending'}</td>
          <td><span class="badge ${t.status.toLowerCase()}">${t.status}</span></td>
          <td>$${t.earnings || '0.00'}</td>
        </tr>
      `).join("");
    }
  } catch (e) {
    console.error("Error loading dashboard:", e);
  }
}

window.logout = function() {
    localStorage.removeItem("token");
    window.location.href = '/index.html';
};
