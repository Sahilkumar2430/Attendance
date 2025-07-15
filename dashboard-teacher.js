const departmentEl = document.getElementById("department");
const courseEl = document.getElementById("course");
const subjectEl = document.getElementById("subject");

// Course & Subject Mapping
const data = {
  cse: {
    courses: {
      "B.Tech": ["Data Structures", "Operating Systems", "DBMS", "AI & ML"],
      "M.Tech": ["Advanced Algorithms", "Cloud Computing"]
    }
  },
  me: {
    courses: {
      "M.Tech": ["CAD/CAM", "Thermodynamics", "Fluid Mechanics"],
      "Diploma": ["Engineering Drawing", "Workshop Practice"]
    }
  },
  ee: {
    courses: {
      "B.Tech": ["Circuit Analysis", "Power Systems"],
      "Ph.D": ["Advanced Electrical Machines"]
    }
  },
  ce: {
    courses: {
      "B.Tech": ["Structural Analysis", "Surveying"],
      "M.Tech": ["Construction Planning", "Earthquake Engineering"]
    }
  },
  bt: {
    courses: {
      "B.Tech": ["Genetic Engineering", "Bioprocess Technology"],
      "Ph.D": ["Bioinformatics", "Stem Cell Research"]
    }
  }
};

// Handle Department Change
departmentEl.addEventListener("change", () => {
  const dept = departmentEl.value;
  courseEl.innerHTML = '<option value="">-- Select Course --</option>';
  subjectEl.innerHTML = '<option value="">-- Select Subject --</option>';
  courseEl.disabled = true;
  subjectEl.disabled = true;

  if (dept && data[dept]) {
    const courseOptions = Object.keys(data[dept].courses);
    courseOptions.forEach(course => {
      const opt = document.createElement("option");
      opt.value = course;
      opt.textContent = course;
      courseEl.appendChild(opt);
    });
    courseEl.disabled = false;
  }
});

// Handle Course Change
courseEl.addEventListener("change", () => {
  const dept = departmentEl.value;
  const course = courseEl.value;
  subjectEl.innerHTML = '<option value="">-- Select Subject --</option>';
  subjectEl.disabled = true;

  if (dept && course && data[dept].courses[course]) {
    data[dept].courses[course].forEach(subject => {
      const opt = document.createElement("option");
      opt.value = subject;
      opt.textContent = subject;
      subjectEl.appendChild(opt);
    });
    subjectEl.disabled = false;
  }
});

// Attendance (Demo)
function startAttendance() {
  const status = document.getElementById("attendanceStatus");
  const dept = departmentEl.value;
  const course = courseEl.value;
  const subject = subjectEl.value;

  if (!dept || !course || !subject) {
    status.style.color = "red";
    status.textContent = "❌ Please select department, course, and subject.";
    return;
  }

  status.style.color = "green";
  status.textContent = `✅ Attendance started for ${subject} (${course}, ${dept.toUpperCase()}) at ${new Date().toLocaleTimeString()}`;
}

// Complaint Submission
document.getElementById("complaintForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("studentName").value;
  const text = document.getElementById("complaintText").value;
  const status = document.getElementById("complaintStatus");

  if (!name || !text) {
    status.style.color = "red";
    status.textContent = "❌ Fill in all complaint details.";
    return;
  }

  // Simulated save (replace with API call later)
  status.style.color = "green";
  status.textContent = `✅ Complaint submitted for ${name}`;
  this.reset();
});

function logout() {
  alert("You have been logged out.");
  window.location.href = "login.html";
}
function startAttendance() {
  const department = document.getElementById("department").value;
  const course = document.getElementById("course").value;
  const subject = document.getElementById("subject").value;

  if (!department || !course || !subject) {
    alert("❌ Please select department, course, and subject.");
    return;
  }

  // Save values temporarily in sessionStorage
  sessionStorage.setItem("department", department);
  sessionStorage.setItem("course", course);
  sessionStorage.setItem("subject", subject);

  // Redirect to actual attendance marking page
  window.location.href = "mark-attendance.html";
}

