
document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  alert(`Registered user: ${name} (${email})`);
});
