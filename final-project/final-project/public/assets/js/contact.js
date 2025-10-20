document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const data = new URLSearchParams();
      const first = document.getElementById("first_name").value.trim();
      const last = document.getElementById("last_name").value.trim();
      const email = document.getElementById("email").value.trim();
      const feedback = document.getElementById("feedback").value.trim();
  
      // Clear messages
      document.getElementById("firstNameError").textContent = "";
      document.getElementById("lastNameError").textContent = "";
      document.getElementById("emailError").textContent = "";
      document.getElementById("feedbackError").textContent = "";
      document.getElementById("successMessage").textContent = "";
  
      let hasError = false;
  
      // Validations
      if (first && /\d/.test(first)) {
        document.getElementById("firstNameError").textContent = "First name cannot contain numbers";
        hasError = true;
      }
  
      if (last && /\d/.test(last)) {
        document.getElementById("lastNameError").textContent = "Last name cannot contain numbers";
        hasError = true;
      }
  
      if (email && !email.includes("@")) {
        document.getElementById("emailError").textContent = "Email must contain '@'";
        hasError = true;
      }
  
      if (feedback.length > 100) {
        document.getElementById("feedbackError").textContent = "Feedback must be under 100 characters";
        hasError = true;
      }
  
      if (hasError) return;
  
      // Build data payload
      data.append("first_name", first);
      data.append("last_name", last);
      data.append("email", email);
      data.append("feedback", feedback);
  
      // Submit via AJAX
      fetch("/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: data.toString()
      })
        .then(res => res.json())
        .then(result => {
          if (result.success) {
            document.getElementById("successMessage").textContent = "Thank you for your feedback!";
            form.reset();
          } else {
            alert(result.error || "Submission failed.");
          }
        });
    });
  
    // Add login/logout (shared with other pages)
    fetch("/userinfo")
      .then(res => res.json())
      .then(data => {
        const container = document.getElementById("authButtonContainer");
        if (!container) return;
  
        if (data.username) {
          container.innerHTML = `<a href="/logout"><button class="auth-btn logout">Logout</button></a>`;
        } else {
          container.innerHTML = `<a href="/login"><button class="auth-btn login">Login</button></a>`;
        }
      });
  });
  