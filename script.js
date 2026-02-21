// 1. Variable Declarations
const slider = document.getElementById('moodSlider');
const emojiDisplay = document.getElementById('emojiDisplay');
const moodText = document.getElementById('moodText');
const magicBtn = document.getElementById('magicBtn');
const resultText = document.getElementById('resultText');
const catBtns = document.querySelectorAll('.cat-btn');
const modal = document.getElementById('prefModal');
const formBody = document.getElementById('form-body');
const modalTitle = document.getElementById('modalTitle');
const submitAction = document.getElementById('submitAction');

let currentCategory = 'watch';

// 2. Data Mockup (For Direct Magic Button clicks)
const suggestions = {
    1: { // Productive
        watch: "Limitless (Focus on the grind!)",
        eat: "A fresh Acai Bowl for brain power",
        listen: "Lofi Beats - Deep Focus playlist",
        go: "A co-working cafe with good coffee"
    },
    2: { // Neutral
        watch: "The Office (Always a safe bet)",
        eat: "Classic Margherita Pizza",
        listen: "Top 50 Global Hits",
        go: "A walk in the local park"
    },
    3: { // Sad/Heartbroken
        watch: "Legally Blonde (Ultimate comeback vibes)",
        eat: "Double Chocolate Brownie",
        listen: "Adele - 21 (Lean into it)",
        go: "A quiet bookstore or library"
    }
};

// 3. Form Templates
const formTemplates = {
    watch: `
        <p style="font-weight:600; margin-bottom:10px;">Enter 3 movies you can't decide between:</p>
        <div class="form-group"><input type="text" class="movie-input" placeholder="Option 1"></div>
        <div class="form-group"><input type="text" class="movie-input" placeholder="Option 2"></div>
        <div class="form-group"><input type="text" class="movie-input" placeholder="Option 3"></div>
        <p style="font-size:0.8rem; color: #888;">We'll pick the one that matches your current energy.</p>
    `,
   eat: `
    <label>Step 1: Upload Menu</label>
    <div class="upload-box" onclick="document.getElementById('fileInput').click()">
        <span id="uploadPlaceholder">📸 Tap to Scan Menu</span>
        <input type="file" id="fileInput" hidden accept="image/*" onchange="previewMenu(this)">
        <img id="menuPreview" src="" alt="Menu Preview">
    </div>
    
    <div class="form-group" style="margin-top:20px;">
        <label>Step 2: Expense Priority</label>
        <input type="range" min="1" max="3" value="2" class="expense-range" id="expensePriority">
        <div class="priority-labels">
            <span>Budget</span>
            <span>Balanced</span>
            <span>Splurge</span>
        </div>
    </div>
`,
    go: `
        <div class="form-group">
            <label>Budget (Expense):</label>
            <input type="range" min="100" max="5000" step="100">
        </div>
        <div class="form-group">
            <label>Duration:</label>
            <select><option>Day Trip</option><option>Weekend</option><option>Long Vacay</option></select>
        </div>
    `,
    listen: `
        <div class="form-group">
            <label>Language:</label>
            <select id="lang"><option>English</option><option>Hindi</option><option>Spanish</option><option>K-Pop</option></select>
        </div>
        <p style="font-size:0.8rem; color: #888; margin-top:10px;">Mood will be synced from your main slider!</p>
    `
};

// 4. Slider Logic
slider.oninput = function() {
    const val = parseInt(this.value);
    
    if (val < 33) {
        emojiDisplay.innerHTML = "☀️";
        moodText.innerHTML = "Productive / Energetic";
        moodText.style.color = "#D4AF37"; 
    } else if (val >= 33 && val <= 66) {
        emojiDisplay.innerHTML = "😐";
        moodText.innerHTML = "Relaxed / Chill";
        moodText.style.color = "#5D87BB"; 
    } else {
        emojiDisplay.innerHTML = "💔";
        moodText.innerHTML = "Heartbroken / Sad";
        moodText.style.color = "#C74B67"; 
    }

    const scale = 1 + (Math.abs(val - 50) / 150); 
    emojiDisplay.style.transform = `scale(${scale})`;
};

// 5. Category Selection & Modal Opening
catBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        catBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        currentCategory = btn.getAttribute('data-type');
        modalTitle.innerText = `Customize your ${currentCategory}`;
        formBody.innerHTML = formTemplates[currentCategory];
        modal.style.display = "block";
    });
});

// 6. Modal Form Submission Logic
submitAction.onclick = () => {
    const moodValue = parseInt(slider.value);
    modal.style.display = "none";
    resultText.style.opacity = 0;

    setTimeout(() => {
        if (currentCategory === 'watch') {
            const inputs = document.querySelectorAll('.movie-input');
            const movies = Array.from(inputs).map(i => i.value.trim()).filter(v => v !== "");
            
            if(movies.length > 0) {
                let choice;
                if (moodValue <= 33) choice = movies[0];
                else if (moodValue <= 66) choice = movies[1] || movies[0];
                else choice = movies[2] || movies[movies.length - 1];

                resultText.innerHTML = `🎬 Mood Match: <strong>${choice}</strong>`;
            } else {
                resultText.innerHTML = "Please enter some movie names!";
            }
        } 
       else if (currentCategory === 'eat') {
    const expense = document.getElementById('expensePriority').value; // 1, 2, or 3
    const moodValue = parseInt(slider.value); // 1-100

    // This simulates the data extracted from the OCR scan of your menu
    const simulatedMenuData = [
        { name: "Garden Fresh Salad", price: "Budget", mood: "Productive" },
        { name: "Double Cheese Margherita", price: "Balanced", mood: "Relaxed" },
        { name: "Truffle Glazed Steak", price: "Splurge", mood: "Sad" },
        { name: "Espresso & Avocado Toast", price: "Budget", mood: "Productive" },
        { name: "Creamy Pesto Pasta", price: "Balanced", mood: "Relaxed" },
        { name: "Dark Chocolate Lava Cake", price: "Splurge", mood: "Sad" }
    ];

    // Map expense value to labels
    const priceMap = { "1": "Budget", "2": "Balanced", "3": "Splurge" };
    const targetPrice = priceMap[expense];

    // Filter the "scanned" menu based on user's expense choice
    const possibleChoices = simulatedMenuData.filter(item => item.price === targetPrice);
    
    // Pick based on mood (Productive = start of list, Sad = end of list)
    const dishIndex = moodValue < 50 ? 0 : 1;
    const finalDish = possibleChoices[dishIndex] || possibleChoices[0];

    // Show a "Processing" state first
    resultText.innerHTML = "🔍 Scanning Menu... Analyzing prices...";
    
    setTimeout(() => {
        resultText.innerHTML = `🍕 <strong>Menu Analysis Complete!</strong><br>From your uploaded menu, we recommend the <strong>${finalDish.name}</strong> to match your ${targetPrice} budget and current vibe.`;
        if (typeof confetti === 'function') confetti({ particleCount: 150 });
    }, 1500); // 1.5 second delay makes the "AI" feel like it's working
}
        else if (currentCategory === 'go') {
            resultText.innerHTML = "✈️ Pack your bags! We suggest a <strong>Mountain Retreat</strong> for your energy.";
        }
        else if (currentCategory === 'listen') {
            const lang = document.getElementById('lang').value;
            resultText.innerHTML = `🎧 Playing a <strong>${lang}</strong> hit that matches your mood!`;
        }

        resultText.style.opacity = 1;

        if (typeof confetti === 'function') {
            confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
        }
    }, 500);
};

// 7. Magic Button Logic (Direct Recommendation without Modal)
magicBtn.addEventListener('click', () => {
    const val = parseInt(slider.value);
    let moodKey;
    
    if (val < 33) moodKey = 1;
    else if (val <= 66) moodKey = 2;
    else moodKey = 3;

    resultText.style.opacity = 0;
    
    setTimeout(() => {
        const pick = suggestions[moodKey][currentCategory];
        resultText.innerHTML = `✨ <strong>Vibe Check Result:</strong> <br> ${pick}`;
        resultText.style.opacity = 1;
        
        if (typeof confetti === 'function') {
            confetti({ particleCount: 100, spread: 50, origin: { y: 0.8 } });
        }
    }, 300);
});

// 8. Close Modal Logic
document.querySelector('.close-btn').onclick = () => modal.style.display = "none";
window.onclick = (e) => { 
    if(e.target == modal) modal.style.display = "none"; 
};
function previewMenu(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('menuPreview').src = e.target.result;
            document.getElementById('menuPreview').style.display = "block";
            document.getElementById('uploadPlaceholder').style.display = "none";
        };
        reader.readAsDataURL(input.files[0]);
    }
}