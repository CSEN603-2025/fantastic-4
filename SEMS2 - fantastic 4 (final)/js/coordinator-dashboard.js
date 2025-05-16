const applications = [
    {
        student: "Alice Gamal",
        internship: "Frontend Developer at Amazon",
        status: "pending",
    },
    {
        student: "Omar Elbaz",
        internship: "Backend Intern at Google",
        status: "accepted",
    },
    {
        student: "Mona Sherif",
        internship: "Data Analyst at Microsoft",
        status: "rejected",
    }
];

const tbody = document.querySelector("#applicationsTable tbody");
const filter = document.getElementById("filterStatus");

function renderTable(filteredApps) {
    tbody.innerHTML = ""; // Clear previous rows

    filteredApps.forEach(app => {
        const row = document.createElement("tr");
        row.innerHTML = `
      <td>${app.student}</td>
      <td>${app.internship}</td>
      <td>${app.status}</td>
      <td>
        <select>
          <option>Evaluator 1</option>
          <option>Evaluator 2</option>
        </select>
      </td>
      <td>
        <select>
          <option>Company A</option>
          <option>Company B</option>
        </select>
      </td>
    `;
        tbody.appendChild(row);
    });
}

// Initial render
renderTable(applications);

// Filter logic
filter.addEventListener("change", () => {
    const status = filter.value;
    if (status === "all") {
        renderTable(applications);
    } else {
        const filtered = applications.filter(app => app.status === status);
        renderTable(filtered);
    }
});
