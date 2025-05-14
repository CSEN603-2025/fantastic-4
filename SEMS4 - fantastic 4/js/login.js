document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const role = document.getElementById("role").value;

    if (role === "student") {
        window.location.href = "student-dashboard.html";
    } else if (role === "company") {
        window.location.href = "company-dashboard.html";
    } else if (role === "coordinator") {
        window.location.href = "coordinator-dashboard.html";
    } else {
        alert("Please select a valid role.");
    }
});
