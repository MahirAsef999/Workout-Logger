document.addEventListener("DOMContentLoaded", () => {
    // Elements
    const form                   = document.getElementById("workoutForm");
    const logsContainer          = document.getElementById("logsContainer");
    const searchResultsContainer = document.getElementById("searchResults");
    const adviceForm             = document.getElementById("adviceForm");
    const adviceInput            = document.getElementById("adviceQuestion");
    const adviceBox              = document.getElementById("adviceBox");
    const searchForm             = document.getElementById("searchForm");
  
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
          if (!entry) return;
          form.setAttribute("data-edit-id", id);
          form.date.value     = entry.date;
          form.exercise.value = entry.exercise;
          form.weight.value   = entry.weight || "";
          form.sets.value     = entry.sets   || "";
          form.reps.value     = entry.reps   || "";
          form.time.value     = entry.time   || "";
          form.distance.value= entry.distance|| "";
          form.calories.value = entry.calories|| "";
        });
      });
  
      // Delete Button
      document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const id = btn.dataset.id;
          if (!confirm("Are you sure you want to delete this log?")) return;
          fetch("/logs/delete", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `id=${id}`
          })
          .then(r => r.json())
          .then(data => {
            if (data.success) loadLogs();
            else alert("Failed to delete log.");
          });
        });
      });
    }
  
    // Show logs in container
    function displayLogs(logs, container) {
      if (!Array.isArray(logs) || logs.length === 0) {
        container.innerHTML = "<p>No logs found.</p>";
        return;
      }

    // Create HTML for each log
    container.innerHTML = logs.map(log => `
        <div class="log-card" data-id="${log.id}">
          <p><span>Date:</span> ${formatDateForDisplay(log.date)}</p>
          <p><span>Exercise:</span> ${log.exercise}</p>
          <p><span>Weight:</span> ${log.weight || 'N/A'}</p>
          <p><span>Sets:</span> ${log.sets   || 'N/A'}</p>
          <p><span>Reps:</span> ${log.reps   || 'N/A'}</p>
          <p><span>Time:</span> ${log.time   || 'N/A'}</p>
          <p><span>Distance:</span> ${log.distance|| 'N/A'}</p>
          <p><span>Calories:</span> ${log.calories|| 'N/A'}</p>
          <div class="log-buttons">
            <button class="edit-btn" data-id="${log.id}">Edit</button>
            <button class="delete-btn" data-id="${log.id}">Delete</button>
        </div>
    </div>
      `).join("");
      attachLogButtons(logs);
    }
  
    // Load logs from server
    function loadLogs() {
      fetch(`/logs?ts=${Date.now()}`)
        .then(r => r.ok ? r.json() : Promise.reject("Network error"))
        .then(logs => displayLogs(logs, logsContainer))
        .catch(err => {
          console.error("Error loading logs:", err);
          logsContainer.innerHTML = "<p>Error loading logs. Please try again.</p>";
        });
    }
  
    // Workout Submission form
    if (form) {
      form.addEventListener("submit", e => {
        e.preventDefault();
        const data = new URLSearchParams();
        data.append("date", form.date.value);
        data.append("exercise", form.exercise.value.trim());
        ["weight","sets","reps","time","distance","calories"].forEach(field => {
          const val = form[field].value.trim();
          if (val) data.append(field, val);
        });
        const id = form.getAttribute("data-edit-id");
        const endpoint = id ? "/logs/update" : "/logs";
        if (id) data.append("id", id);
  
        fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: data.toString()
        })
        .then(r => r.json())
        .then(result => {
          if (result.success) {
            form.reset();
            form.removeAttribute("data-edit-id");
            loadLogs();
          } else {
            alert(result.error || "Failed to save workout.");
          }
        });
      });
    }
  
    // Search logs by exercise
    if (searchForm) {
      searchForm.addEventListener("submit", e => {
        e.preventDefault();
        const q = document.getElementById("searchExercise").value.trim();
        if (!q) {
          searchResultsContainer.innerHTML = "";
          return;
        }
        fetch(`/logs?exercise=${encodeURIComponent(q)}`)
          .then(r => r.json())
          .then(logs => {
            if (Array.isArray(logs) && logs.length)
              displayLogs(logs, searchResultsContainer);
            else
              searchResultsContainer.innerHTML = `<p>No logs matching “${q}”.</p>`;
          })
          .catch(err => {
            console.error("Search error:", err);
            searchResultsContainer.innerHTML = "<p>Error fetching search results.</p>";
          });
      });
    }
  
    // Ask for Advice
    if (adviceForm) {
      adviceForm.addEventListener("submit", async e => {
        e.preventDefault();
        const question = adviceInput.value.trim();
        if (!question) return;
        adviceBox.textContent = "Thinking…";
        try {
          const res  = await fetch(`/advice?question=${encodeURIComponent(question)}`);
          const json = await res.json();
          adviceBox.textContent = json.advice || json.error || "No advice returned.";
        } catch (err) {
          console.error("Advice error:", err);
          adviceBox.textContent = "Something went wrong.";
        }
      });
    }
  
    loadLogs(); // Initial log load
  
  }); 
  