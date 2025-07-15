function logout() {
  alert("Admin logged out.");
  window.location.href = "login.html";
}

function viewAttendance() {
  const container = document.getElementById("attendanceRecords");

  // Sample static data (replace with API call)
  container.innerHTML = `
    <ul>
      <li>📅 2025-07-14 - CSE - B.Tech - AI & ML - 28 Present / 30</li>
      <li>📅 2025-07-13 - ME - M.Tech - Thermodynamics - 22 Present / 25</li>
    </ul>
  `;
}

function showAddUser() {
  const container = document.getElementById("userActions");
  container.innerHTML = `
    <h4>Add New User</h4>
    <input type="text" id="newUserName" placeholder="Name" />
    <input type="text" id="newUserEmail" placeholder="Email" />
    <select id="userRole">
      <option value="student">Student</option>
      <option value="teacher">Teacher</option>
    </select>
    <button onclick="addUser()">Add</button>
  `;
}

function showRemoveUser() {
  const container = document.getElementById("userActions");
  container.innerHTML = `
    <h4>Remove User</h4>
    <input type="text" id="removeUserEmail" placeholder="Enter Email" />
    <button onclick="removeUser()">Remove</button>
  `;
}

function addUser() {
  const name = document.getElementById("newUserName").value;
  const email = document.getElementById("newUserEmail").value;
  const role = document.getElementById("userRole").value;

  alert(`✅ ${role.charAt(0).toUpperCase() + role.slice(1)} "${name}" added with email ${email}`);
  // Later: Send POST request to backend
}
function viewAllUsers() {
  const container = document.getElementById("userActions");
  container.innerHTML = `<p>🔄 Fetching user data...</p>`;

  fetch("http://localhost:5000/api/users")
    .then(response => response.json())
    .then(users => {
      if (!users.length) {
        container.innerHTML = `<p>⚠️ No active users found.</p>`;
        return;
      }

      const listHTML = users.map(user => `
        <li>
          <strong>${user.role}</strong>: ${user.name} (<em>${user.email}</em>)
        </li>
      `).join("");

      container.innerHTML = `
        <h4>👥 Active Users in System</h4>
        <ul>${listHTML}</ul>
      `;
    })
    .catch(error => {
      console.error("Error fetching users:", error);
      container.innerHTML = `<p>❌ Failed to load users from server.</p>`;
    });
}




function removeUser() {
  const email = document.getElementById("removeUserEmail").value;
  alert(`❌ User with email ${email} removed`);
  // Later: Send DELETE request to backend
}

function generateReport() {
  const container = document.getElementById("reportResults");
  container.innerHTML = `
    <p>📈 Department: CSE</p>
    <p>Overall Attendance: 91%</p>
    <p>Low Attendance Alerts: 3 students</p>
  `;
}
