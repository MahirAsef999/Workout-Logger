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
 
 
       
    // Format Data
    function formatDateForDisplay(dateStr) {
        return dateStr;
    }

    // Edit/Delete buttons for each log
    function attachLogButtons(logs) {
        // Edit Button
        document.querySelectorAll(".edit-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const id = btn.dataset.id;
                const entry = logs.find(l => l.id == id);
                if (entry) {
                    form.setAttribute("data-edit-id", id);
                    form.date.value = entry.date;
                    form.exercise.value = entry.exercise;
                    form.weight.value = entry.weight ?? '';
                    form.sets.value = entry.sets ?? '';
                    form.reps.value = entry.reps ?? '';
                    form.time.value = entry.time ?? '';
                    form.distance.value = entry.distance ?? '';
                    form.calories.value = entry.calories ?? '';
                }
            });
        });

        // Delete button
        document.querySelectorAll(".delete-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const id = btn.dataset.id;
                if (confirm("Are you sure you want to delete this log?")) {
                    fetch("/logs/delete", {
                        method: "POST",
                        headers: { "Content-Type": "application/x-www-form-urlencoded" },
                        body: `id=${id}`
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.success) loadLogs();
                            else alert("Failed to delete log.");
                        });
                }
            });
        });
    }

    // Show logs in the container
    function displayLogs(logs, container) {
        if (!Array.isArray(logs) || logs.length === 0) {
            container.innerHTML = "<p>No logs found.</p>";
            return;
        }
        // Create HTML for each log
        container.innerHTML = logs.map(log => 
            `<div class="log-card" data-id="${log.id}">
                <p><span>Date:</span> ${formatDateForDisplay(log.date)}</p>
                <p><span>Exercise:</span> ${log.exercise}</p>
                <p><span>Weight:</span> ${log.weight || 'N/A'}</p>
                <p><span>Sets:</span> ${log.sets || 'N/A'}</p>
                <p><span>Reps:</span> ${log.reps || 'N/A'}</p>
                <p><span>Time:</span> ${log.time || 'N/A'}</p>
                <p><span>Distance:</span> ${log.distance || 'N/A'}</p>
                <p><span>Calories:</span> ${log.calories || 'N/A'}</p>
                <div class="log-buttons">
                    <button class="edit-btn" data-id="${log.id}">Edit</button>
                    <button class="delete-btn" data-id="${log.id}">Delete</button>
                </div>
            </div>`).join("");

        attachLogButtons(logs);  // Enable Edit/Delete
    }

    // Load logs from server
    function loadLogs() {
        fetch(`/logs?ts=${Date.now()}`)  // Add timestamp to prevent caching
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(logs => {
                displayLogs(logs, logsContainer);
            })
            .catch(error => {
                console.error('Error loading logs:', error);
                logsContainer.innerHTML = "<p>Error loading logs. Please try again.</p>";
            });
    }

    // Workout Submission Form
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            const data = new URLSearchParams();

            // Collect form data
            data.append("date", form.date.value);
            data.append("exercise", form.exercise.value.trim());
            if (form.weight.value.trim()) data.append("weight", form.weight.value);
            if (form.sets.value.trim()) data.append("sets", form.sets.value);
            if (form.reps.value.trim()) data.append("reps", form.reps.value);
            if (form.time.value.trim()) data.append("time", form.time.value);
            if (form.distance.value.trim()) data.append("distance", form.distance.value);
            if (form.calories.value.trim()) data.append("calories", form.calories.value);

            const id = form.getAttribute("data-edit-id");
            const endpoint = id ? "/logs/update" : "/logs";
            if (id) data.append("id", id);

            fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: data.toString()
            })
                .then(res => res.json())
                .then(result => {
                    if (result.success) {
                        console.log("Workout saved successfully!");
                        form.reset();
                        form.removeAttribute("data-edit-id");
                        loadLogs();  // Reload the logs after successful submission
                    } else {
                        alert(result.error || "Failed to save workout.");
                    }
                });
        });
    }

    // Search logs by exercise
    if (searchForm) {
        searchForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const keyword = document.getElementById("searchExercise").value.trim()
            if (keyword === '') {
                searchResultsContainer.innerHTML = "";
                return;

            }

            console.log("Searching for.",keyword)

            fetch("/logs?exercise=" + encodeURIComponent(keyword))
                .then(res => {
                    console.log("Search response:", res.status);
                    if (!res.ok) {
                        throw new Error('ERROR!!');
                    }
        const clone = res.clone();
        clone.text().then(text => {
            console.log("Raw response text:", text.substring(0, 200) + (text.length > 200 ? "..." : ""));
            try {
                JSON.parse(text);
                console.log("Response is valid JSON");
            } catch (e) {
                console.error("Response is not valid JSON:", e);
            }
        });
        
        return res.json();
    })
    .then(logs => {
        console.log("Search results:", logs);
        if (logs && Array.isArray(logs)) {
            if (logs.length === 0) {
                searchResultsContainer.innerHTML = `<p>No logs found matching "${keyword}".</p>`;
            } else {
                displayLogs(logs, searchResultsContainer);
            }
        } else {
            console.error("Invalid data format received:", logs);
            searchResultsContainer.innerHTML = "<p>Received invalid data format from server.</p>";
        }
    })
    .catch(error => {
        console.error("Search error details:", {
            message: error.message,
            name: error.name,
            stack: error.stack
        });
        searchResultsContainer.innerHTML = `<p>Could not fetch search results: ${error.message}</p>`;
    });
});
    }

    loadLogs();  // Initial log load
});


