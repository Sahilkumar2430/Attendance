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

// Display selections
document.getElementById("deptText").textContent = readableDepartments[dept] || dept;
document.getElementById("courseText").textContent = course;
document.getElementById("subjectText").textContent = subject;

document.getElementById("markNowBtn").addEventListener("click", () => {
  const now = new Date();
  const time = now.toLocaleTimeString();

  const status = document.getElementById("statusMessage");
  status.textContent = `✅ Attendance marked at ${time} for ${subject}.`;

  console.log("Attendance marked:", {
    department: readableDepartments[dept],
    course,
    subject,
    timestamp: now.toISOString()
  });

  // Later: Send this data to backend API
});

function startAttendance() {
  const department = document.getElementById("department").value;
  const course = document.getElementById("course").value;
  const subject = document.getElementById("subject").value;

  if (!department || !course || !subject) {
    alert("❌ Please select department, course, and subject.");
    return;
  }

  // Save selected details in sessionStorage for access in mark-attendance.html
  sessionStorage.setItem("department", department);
  sessionStorage.setItem("course", course);
  sessionStorage.setItem("subject", subject);

  // Redirect to the real attendance page
  window.location.href = "mark-attendances.html";
}

