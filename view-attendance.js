const listContainer = document.getElementById("attendanceList");

fetch("http://localhost:5000/api/attendance")
  .then(res => res.json())
  .then(records => {
    if (!records.length) {
      listContainer.innerHTML = "<p>⚠️ No attendance records found.</p>";
      return;
    }

    listContainer.innerHTML = "";

    records.forEach((record, index) => {
      const div = document.createElement("div");
      div.className = "record";

      let students = record.records.map(student =>
        `<li>${student.roll}: <strong>${student.status}</strong></li>`
      ).join("");

      div.innerHTML = `
        <h3>📅 ${record.date} — ${record.department} / ${record.course} / ${record.subject}</h3>
        <ul>${students}</ul>
      `;

      listContainer.appendChild(div);
    });
  })
  .catch(err => {
    console.error("Error fetching attendance:", err);
    listContainer.innerHTML = "<p>❌ Failed to load attendance records.</p>";
  });
