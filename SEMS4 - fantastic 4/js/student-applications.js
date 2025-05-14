// js/student-applications.js
document.addEventListener('DOMContentLoaded', () => {
    // Load applications from localStorage
    let applications = JSON.parse(localStorage.getItem('studentApplications')) || [];
    const tableBody = document.querySelector('#applicationsTable tbody');
    const statusFilter = document.getElementById('filterStatus');

    // Render applications
    function renderApplications(filteredApps = applications) {
        tableBody.innerHTML = '';

        filteredApps.forEach(app => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${app.internshipTitle}</td>
                <td>${app.companyName}</td>
                <td>${new Date(app.appliedDate).toLocaleDateString()}</td>
                <td class="status ${app.status}">${app.status}</td>
                <td><button class="view-btn" data-id="${app.id}">View</button></td>
            `;
            tableBody.appendChild(row);
        });

        // Add event listeners to view buttons
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', () => viewApplicationDetails(btn.dataset.id));
        });
    }

    // View application details
    function viewApplicationDetails(appId) {
        const app = applications.find(a => a.id === appId);
        if (!app) return;

        document.getElementById('modalAppTitle').textContent = app.internshipTitle;
        document.getElementById('modalAppCompany').textContent = app.companyName;
        document.getElementById('modalAppDate').textContent = new Date(app.appliedDate).toLocaleString();
        document.getElementById('modalAppStatus').textContent = app.status;
        document.getElementById('modalAppCoverLetter').textContent = app.coverLetter || 'No cover letter submitted';

        // Display documents
        const docsContainer = document.getElementById('modalAppDocuments');
        docsContainer.innerHTML = '';
        if (app.documents && app.documents.length > 0) {
            app.documents.forEach(doc => {
                const docEl = document.createElement('div');
                docEl.className = 'document';
                docEl.textContent = doc.name;
                docsContainer.appendChild(docEl);
            });
        } else {
            docsContainer.textContent = 'No documents submitted';
        }

        // Show modal
        document.getElementById('applicationModal').style.display = 'block';
    }

    // Filter applications
    function filterApplications() {
        const status = statusFilter.value;
        const filtered = status === 'all'
            ? applications
            : applications.filter(app => app.status === status);
        renderApplications(filtered);
    }

    // Event listeners
    statusFilter.addEventListener('change', filterApplications);
    document.querySelector('.close').addEventListener('click', () => {
        document.getElementById('applicationModal').style.display = 'none';
    });

    // Initialize
    renderApplications();
});