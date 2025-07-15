document.getElementById("removeUserForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("removeEmail").value.trim();

  const res = await fetch(`http://localhost:5000/api/users/${email}`, {
    method: "DELETE"
  });

  const data = await res.json();
  document.getElementById("status").textContent = data.message || "✅ User removed successfully!";
});
