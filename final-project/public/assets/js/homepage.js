document.addEventListener("DOMContentLoaded", function () {
    // Elements
    const form = document.getElementById("workoutForm");
    const logsContainer = document.getElementById("logsContainer");
    const searchResultsContainer = document.getElementById("searchResults");
    const adviceForm = document.getElementById("adviceForm");
    const adviceBox = document.getElementById("adviceBox");
    const searchForm = document.getElementById("searchForm");

    // Show login/logout button in header 
    fetch("/userinfo")
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById("authButtonContainer");
            if (!container) return;

            if (data.username) {
                container.innerHTML = `<a href="/logout"><button class="auth-btn logout">Logout</button></a>`;
                const intro = document.querySelector(".intro");
                if (intro) {
                    intro.textContent = `Welcome back, ${data.username}! Track your fitness progress, stay motivated, and achieve your workout goals.`;
                }
            } else {
                container.innerHTML = `<a href="/login"><button class="auth-btn login">Login</button></a>`;
                const intro = document.querySelector(".intro");
                if (intro) {
                    intro.textContent = "Welcome, guest!";
                }
            }
        });


    // Homepage welcome animation
    const h1 = document.querySelector(".hero h1");
    const p = document.querySelector(".hero p");
    const btn = document.querySelector(".cta-button");

     if (h1 && p && btn) {
        h1.style.opacity = 0;
         p.style.opacity = 0;
         btn.style.opacity = 0;
         setTimeout(() => { h1.style.opacity = 1; h1.style.transition = 'opacity 0.6s'; }, 100);
         setTimeout(() => { p.style.opacity = 1; p.style.transition = 'opacity 0.6s'; }, 300);
         setTimeout(() => { btn.style.opacity = 1; btn.style.transition = 'opacity 0.6s'; }, 500);
     }
 
 
});