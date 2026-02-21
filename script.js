/* 1. Global Reset & Variables */
:root {
    --off-white: #f8f9fa; /* Softened for better contrast with pastels */
    --pastel-blue: #c1fcf9;
    --pastel-green: #e2f0cb;
    --pastel-peach: #ffdac1;
    --text-black: #1a1a1a;
    --glass-white: rgba(255, 255, 255, 0.2);
    --glass-dark: rgba(0, 0, 0, 0.1);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

html {
    scroll-behavior: smooth;
}

body {
    background-color: var(--off-white);
    overflow-x: hidden;
}

/* 2. Splash Page Layout */
#splash-page {
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
}

.background-gradient {
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    z-index: -1;
    background: linear-gradient(45deg, #ffb3b6, #fad0c4, #bbdffa, #c2e9fb);
    background-size: 400% 400%;
    animation: gradientBG 8s ease infinite;
}

@keyframes gradientBG {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

.glass-container {
    background: var(--glass-white);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 30px;
    padding: 4rem 6rem;
    text-align: center;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
}

.main-title {
    font-size: 5rem;
    color: #fff;
    text-shadow: 0 4px 10px rgba(0,0,0,0.1);
    margin-bottom: 10px;
    animation: popIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

.sub-text {
    font-size: 1.5rem;
    color: #fff;
    opacity: 0;
    animation: popIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    animation-delay: 0.4s;
}

/* 3. Dashboard Header & Sidebar */
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 5%;
    background: white;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.hamburger-menu {
    width: 30px;
    height: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
}
.hamburger-menu span {
    width: 100%;
    height: 3px;
    background: #333;
    border-radius: 10px;
    transition: 0.3s;
}

.side-panel {
    position: fixed;
    top: 0; left: -300px;
    width: 300px; height: 100%;
    background: white;
    box-shadow: 5px 0 15px rgba(0,0,0,0.1);
    transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    z-index: 2000;
    padding: 30px 20px;
}
.side-panel.active { left: 0; }

/* 4. Wishlist Overlay */
.full-page-overlay {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: var(--off-white);
    z-index: 3000;
    display: none;
    animation: slideUp 0.5s ease forwards;
}

@keyframes slideUp {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
}

.wish-cat {
    background: white;
    padding: 20px;
    border-radius: 20px;
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 4px 10px rgba(0,0,0,0.05);
}

/* 5. Navigation Cards */
.content-area {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 70vh;
}

.card-container { display: flex; gap: 40px; flex-wrap: wrap; justify-content: center; }

.nav-card {
    width: 220px; height: 220px;
    background-color: var(--bg);
    border-radius: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 10px 20px rgba(0,0,0,0.05);
}

.nav-card:hover { transform: translateY(-15px); box-shadow: 0 15px 30px rgba(0,0,0,0.1); }
.nav-card i { font-size: 3.5rem; margin-bottom: 15px; color: #333; }

/* 6. Modals & Forms */
.modal {
    display: none;
    position: fixed;
    z-index: 4000;
    left: 0; top: 0;
    width: 100%; height: 100%;
    background: rgba(0,0,0,0.4);
    backdrop-filter: blur(8px);
}

.modal-content {
    background: white;
    margin: 5% auto;
    padding: 40px;
    width: 90%;
    max-width: 450px;
    border-radius: 30px;
    position: relative;
    animation: popIn 0.5s ease;
}

.radio-group, .checkbox-grid {
    display: flex;
    gap: 10px;
    margin: 15px 0;
    flex-wrap: wrap;
}

.radio-item, .check-item {
    background: #f1f3f5;
    padding: 10px 15px;
    border-radius: 12px;
    cursor: pointer;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: 0.3s;
}

.radio-item:hover, .check-item:hover { background: var(--pastel-blue); }

input[type="radio"], input[type="checkbox"] { accent-color: var(--text-black); }

/* 7. Result Card & Confetti */
.result-card {
    background: white;
    margin: 10% auto;
    padding: 40px;
    width: 90%;
    max-width: 400px;
    border-radius: 40px;
    text-align: center;
    box-shadow: 0 25px 50px rgba(0,0,0,0.2);
    animation: popCenter 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
    z-index: 5000;
}

@keyframes popCenter {
    0% { transform: scale(0); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
}

.confetti {
    position: absolute;
    width: 8px; height: 8px;
    animation: fall 2.5s ease-out forwards;
}

@keyframes fall {
    0% { transform: translateY(0) rotate(0deg); opacity: 1; }
    100% { transform: translateY(400px) rotate(720deg); opacity: 0; }
}

@keyframes popIn {
    0% { transform: scale(0); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
}
