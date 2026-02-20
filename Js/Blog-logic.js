// js/blog-logic.js
import { CONFIG } from '../config.js';

const API = CONFIG.API_BASE;

async function initBlog() {
    const urlParams = new URLSearchParams(window.location.search);
    const producerSlug = urlParams.get('producer');

    if (!producerSlug) {
        document.getElementById('postContent').innerHTML = "<p>Discover our talented producers via the main catalog.</p>";
        return;
    }

    try {
        // Fetch specific producer spotlight data
        const res = await fetch(`${API}/blog/spotlight/${producerSlug}`);
        const data = await res.json();

        if (res.ok) {
            renderBlogPost(data);
        } else {
            document.getElementById('postTitle').textContent = "Producer Spotlight Not Found";
        }
    } catch (err) {
        console.error("SEO Fetch Error:", err);
    }
}

function renderBlogPost(data) {
    document.getElementById('postTitle').textContent = data.title;
    document.getElementById('postDate').textContent = new Date(data.date).toLocaleDateString();
    document.getElementById('postContent').innerHTML = data.content;

    // Inject associated beats to drive license sales
    const beatsContainer = document.getElementById('producerBeats');
    if (data.beats && beatsContainer) {
        beatsContainer.innerHTML = data.beats.map(beat => `
            <div class="card glass-panel">
                <h4>${beat.name}</h4>
                <p class="muted">${beat.genre}</p>
                <button class="btn-primary" onclick="window.location.href='/index.html#beats'">License $${beat.price}</button>
            </div>
        `).join('');
    }
}

initBlog();

import { CONFIG } from '../config.js';

const API = CONFIG.API_BASE;

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const producerId = urlParams.get('id');
    const contentArea = document.getElementById('postContent');
    const titleArea = document.getElementById('postTitle');

    if (!producerId) {
        contentArea.innerHTML = "<p>Please select a producer spotlight from the home page.</p>";
        return;
    }

    try {
        // Fetch public blog data (No Bearer token required for public SEO posts)
        const response = await fetch(`${API}/blog/spotlight?id=${producerId}`);
        const data = await response.json();

        if (response.ok) {
            titleArea.textContent = data.title;
            document.getElementById('postDate').textContent = data.publishDate;
            contentArea.innerHTML = data.articleHtml;

            // Dynamically load the producer's specific beat catalog
            renderRelatedBeats(data.beats);
        } else {
            titleArea.textContent = "Spotlight Not Found";
            contentArea.innerHTML = "<p>The requested producer profile is currently being updated.</p>";
        }
    } catch (error) {
        console.error("SEO Fetch Error:", error);
        contentArea.innerHTML = "<p>Error loading spotlight. Please check your connection.</p>";
    }
});

function renderRelatedBeats(beats) {
    const container = document.getElementById('producerBeats');
    if (!beats || beats.length === 0) return;

    container.innerHTML = beats.map(beat => `
        <div class="card glass-panel">
            <h4>${beat.name}</h4>
            <p class="muted">${beat.bpm} BPM | ${beat.genre}</p>
            <button class="btn-primary" onclick="window.location.href='/index.html#beats'">
                License $${beat.price}
            </button>
        </div>
    `).join('');
}



join('');
}


