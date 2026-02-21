/**
 * VibePick Interactive Script
 * Consolidated & Corrected Version
 */

// Global scope functions for HTML onclick attributes
let toggleSidebar, showWishlistPage, hideWishlistPage, addToWishlist, 
    openModal, closeModal, handleDineoutLogic, handleTravelLogic, 
    handleMovieLogic;

document.addEventListener('DOMContentLoaded', () => {
    const glitterContainer = document.getElementById('glitter-container');
    
    // --- 1. Initial Animations (Glitter) ---
    if (glitterContainer) {
        for (let i = 0; i < 40; i++) {
            setTimeout(() => {
                createGlitter(glitterContainer);
            }, 100 + (i * 25));
        }
    }

    // --- 2. Sidebar & Navigation Logic ---
    toggleSidebar = function() {
        const panel = document.getElementById('side-panel');
        if (panel) panel.classList.toggle('active');
    };

    showWishlistPage = function() {
        const wishlist = document.getElementById('wishlist-page');
        if (wishlist) {
            wishlist.style.display = 'block';
            toggleSidebar(); // Close sidebar when entering
        }
    };

    hideWishlistPage = function() {
        const wishlist = document.getElementById('wishlist-page');
        if (wishlist) wishlist.style.display = 'none';
    };

    addToWishlist = function(category) {
        const item = prompt(`Add a new ${category.toLowerCase()} to your list:`);
        if (item) {
            const list = document.getElementById(`list-${category}`);
            if (list) {
                const li = document.createElement('li');
                li.style.listStyle = "none";
                li.style.padding = "8px 0";
                li.style.borderBottom = "1px solid #eee";
                li.innerHTML = `✨ ${item}`;
                list.appendChild(li);
            }
        }
    };

    // --- 3. Modal Controls ---
    openModal = function(id) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.style.display = "block";
            document.body.style.overflow = "hidden"; // Lock scroll
        }
    };

    closeModal = function(id) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto"; // Unlock scroll
        }
    };

    // --- 4. Feature Specific Logic ---

    // Movie Logic (Combined Mood + Genre)
    handleMovieLogic = function() {
        const genreElement = document.getElementById('movie-genre');
        const moodElement = document.getElementById('movie-mood');
        
        const genre = genreElement ? genreElement.value.toLowerCase() : "";
        const mood = moodElement ? moodElement.value.toLowerCase() : "";
        
        let rec = "";
        if (mood.includes('happy')) rec = "The Grand Budapest Hotel";
        else if (mood.includes('tired')) rec = "Spirited Away";
        else if (genre.includes('horror')) rec = "The Nun";
        else if (genre.includes('comedy')) rec = "Dumb and Dumber";
        else if (genre.includes('romantic')) rec = "Cinderella";
        else rec = "Interstellar";

        showResult('🎬', 'Movie Pick!', `Since you're feeling ${mood || 'vibey'} and want ${genre}, you should watch "${rec}"!`);
    };

    // Travel Logic
    handleTravelLogic = function() {
        const interest = document.getElementById('travel-interest').value;
        const days = document.getElementById('travel-days').value || 3;
        
        let destination = (interest === "Mountains") ? "Swiss Alps" : 
                          (interest === "Modern City") ? "Tokyo" : "The Amalfi Coast";

        showResult('✈️', 'Trip Found!', `Pack for ${days} days! We suggest heading to ${destination} for a ${interest} vibe.`);
    };

    // Dineout Logic
    handleDineoutLogic = function() {
        const fileInput = document.getElementById('menu-upload');
        const dietEl = document.querySelector('input[name="diet"]:checked');
        
        if (fileInput && fileInput.files.length === 0) {
            alert("Please upload a menu card first!");
            return;
        }
        
        const diet = dietEl ? dietEl.value : "any";
        showResult('🍕', 'Tasty Choice!', `We scanned the menu! Based on your ${diet} diet, try the Signature Platter.`);
    };
});

// --- HELPER ENGINES (Outside DOMContentLoaded for clean access) ---

function createGlitter(parent) {
    const sparkle = document.createElement('div');
    sparkle.classList.add('glitter');
    const x = (Math.random() - 0.5) * 500; 
    const y = (Math.random() - 0.5) * 250;
    const size = Math.random() * 8 + 2;
    
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;
    sparkle.style.left = `calc(50% + ${x}px)`;
    sparkle.style.top = `calc(50% + ${y}px)`;
    
    parent.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 3000);
}

function launchConfetti() {
    const container = document.getElementById('confetti-container');
    if (!container) return;
    container.innerHTML = ''; // Clear old confetti
    
    const colors = ['#FFD1DC', '#B2E2F2', '#C1E1C1', '#FFB347', '#B39EB5'];
    for (let i = 0; i < 60; i++) {
        const p = document.createElement('div');
        p.classList.add('confetti');
        p.style.left = Math.random() * 100 + '%';
        p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        p.style.animationDelay = Math.random() * 0.8 + 's';
        container.appendChild(p);
        setTimeout(() => p.remove(), 2500);
    }
}

function showResult(icon, title, text) {
    // Hide input modals
    document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
    
    document.getElementById('result-icon').innerText = icon;
    document.getElementById('result-title').innerText = title;
    document.getElementById('result-text').innerText = text;
    
    const resultModal = document.getElementById('result-modal');
    if (resultModal) {
        resultModal.style.display = 'block';
        launchConfetti();
    }
}

// Global Event Listeners
window.addEventListener('click', (e) => {
    // Close sidebar on outside click
    const panel = document.getElementById('side-panel');
    const burger = document.querySelector('.hamburger-menu');
    if (panel && panel.classList.contains('active') && !panel.contains(e.target) && !burger.contains(e.target)) {
        panel.classList.remove('active');
    }
    // Close modal on overlay click
    if (e.target.classList.contains('modal')) {
        e.target.style.display = "none";
        document.body.style.overflow = "auto";
    }
});
