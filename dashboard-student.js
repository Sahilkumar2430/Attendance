function logout() {
  alert("You have been logged out.");
  window.location.href = "login.html";
}

function viewMyAttendance() {
  const container = document.getElementById("attendanceRecords");
  container.innerHTML = "🔄 Loading...";

  // Fetch attendance by logged-in student email
  const studentEmail = localStorage.getItem("userEmail"); // set during login

  fetch(`http://localhost:5000/api/attendance/student/${studentEmail}`)
    .then(res => res.json())
    .then(data => {
      if (!data.length) {
        container.innerHTML = "⚠️ No records found.";
        return;
      }

      const list = data.map(rec => `
        <li>📅 ${rec.date} - ${rec.subject}: <strong>${rec.status}</strong></li>
      `).join("");

      container.innerHTML = `<ul>${list}</ul>`;
    })
    .catch(err => {
      console.error(err);
      container.innerHTML = "❌ Failed to load attendance.";
    });
}

// Set dummy user profile (replace with real fetch in future)
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("studentName").textContent = "Welcome, Priya";
  document.getElementById("profileName").textContent = "Priya Sharma";
  document.getElementById("profileEmail").textContent = "priya@student.edu";
  document.getElementById("profileCourse").textContent = "B.Tech - CSE";
});
