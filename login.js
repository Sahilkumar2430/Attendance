document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const role = document.getElementById('role').value;
  const errorMsg = document.getElementById('errorMsg');

  if (!username || !password || !role) {
    errorMsg.textContent = "Please fill all fields correctly.";
    return;
  }

  // Simulated login (later use backend validation)
  console.log("Logging in with:", { username, role });

  // Role-based redirection
  if (role === "student") {
    window.location.href = "dashboard-student.html";
  } else if (role === "teacher") {
    window.location.href = "dashboard-teacher.html";
  } else if (role === "admin") {
    window.location.href = "dashboard-admin.html";
  } else {
    errorMsg.textContent = "Invalid role selected.";
  }
});
