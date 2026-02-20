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
