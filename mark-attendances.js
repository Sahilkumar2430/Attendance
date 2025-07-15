const dept = sessionStorage.getItem("department");
const course = sessionStorage.getItem("course");
const subject = sessionStorage.getItem("subject");

const readableDepartments = {
  cse: "Computer Science",
  me: "Mechanical Engineering",
  ee: "Electrical Engineering",
  ce: "Civil Engineering",
  bt: "Biotechnology"
};

document.getElementById("deptText").textContent = readableDepartments[dept] || dept;
document.getElementById("courseText").textContent = course;
document.getElementById("subjectText").textContent = subject;

// Student list
let students = [
  { roll: "CSE001", name: "Aman Verma" },
  { roll: "CSE002", name: "Riya Mehra" },
  { roll: "CSE003", name: "Kunal Singh" },
  { roll: "CSE004", name: "Priya Gupta" },
  { roll: "CSE005", name: "Tushar Yadav" },
];

function renderStudents() {
  const table = document.getElementById("studentTable");
  table.innerHTML = ""; // clear previous content

  students.forEach((student, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${student.roll}</td>
      <td>${student.name}</td>
      <td>
        <select class="status-select" data-roll="${student.roll}">
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>
      </td>
      <td><button class="remove-btn" data-index="${index}">❌</button></td>
    `;
    table.appendChild(row);
  });

  // Attach remove button functionality
  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      const i = parseInt(this.getAttribute("data-index"));
      students.splice(i, 1);
      renderStudents();
    });
  });
}

renderStudents();

// Handle attendance submission
document.getElementById("submitAttendanceBtn").addEventListener("click", () => {
  const allStatus = document.querySelectorAll(".status-select");
  const attendanceData = [];

  allStatus.forEach(select => {
    attendanceData.push({
      roll: select.getAttribute("data-roll"),
      status: select.value
    });
  });

  console.log("📨 Attendance Data Submitted:", {
    department: readableDepartments[dept],
    course,
    subject,
    date: new Date().toDateString(),
    records: attendanceData
  });

  document.getElementById("statusMessage").textContent = "✅ Attendance submitted successfully!";
});

// Handle adding new student
document.getElementById("addStudentForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const roll = document.getElementById("newRoll").value.trim();
  const name = document.getElementById("newName").value.trim();

  if (!roll || !name) return;

  students.push({ roll, name });
  document.getElementById("addStudentForm").reset();
  renderStudents();
});

document.getElementById("submitAttendanceBtn").addEventListener("click", () => {
  const allStatus = document.querySelectorAll(".status-select");
  const attendanceData = [];

  allStatus.forEach(select => {
    attendanceData.push({
      roll: select.getAttribute("data-roll"),
      status: select.value
    });
  });

  const payload = {
    department: readableDepartments[dept],
    course,
    subject,
    date: new Date().toDateString(),
    records: attendanceData
  };

  fetch("http://localhost:5000/api/attendance", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById("statusMessage").textContent = data.message || "✅ Attendance submitted!";
  })
  .catch(err => {
    console.error("Error:", err);
    document.getElementById("statusMessage").textContent = "❌ Submission failed!";
  });
});

