document.getElementById('markBtn').addEventListener('click', () => {
  const status = document.getElementById('markStatus');
  const now = new Date().toLocaleTimeString();

  status.innerText = `✅ Attendance marked at ${now}`;
  status.style.color = 'green';

  // Future: Replace with real API call to mark attendance
  console.log('Attendance marked!');
});

function logout() {
  alert("You have been logged out.");
  window.location.href = "login.html";
}
