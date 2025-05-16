document.addEventListener('DOMContentLoaded', () => {
    // Load student data from profile if available
    const profile = JSON.parse(localStorage.getItem('studentProfile')) || {};
    const studentName = profile.fullName || localStorage.getItem('studentName') || 'Student User';
    document.getElementById('studentName').textContent = studentName;

    // Load application statistics
    const applications = JSON.parse(localStorage.getItem('studentApplications')) || [];
    document.getElementById('appCount').textContent = applications.length;

    // Load available internships count
    const allInternships = getAllInternships();
    document.getElementById('internshipCount').textContent = allInternships.length;

    // Load notifications
    const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
    const list = document.getElementById('notificationsList');

    notifications.slice(0, 5).forEach(note => { // Show only 5 most recent
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${note.subject}</strong><br>
            ${note.body.substring(0, 60)}${note.body.length > 60 ? '...' : ''}
            <small>${new Date(note.date).toLocaleDateString()}</small>
        `;
        list.appendChild(li);
    });

    // Helper function to get all internships (same as in internships.js)
    function getAllInternships() {
        const companies = JSON.parse(localStorage.getItem('companyApplications')) || [];
        const allInternships = [];

        companies.forEach(company => {
            if (company.status === 'approved' && company.internships) {
                company.internships.forEach(internship => {
                    allInternships.push({
                        ...internship,
                        companyName: company.name,
                        companyId: company.id,
                        industry: company.industry
                    });
                });
            }
        });

        return allInternships;
    }

    // Update dashboard links
    document.querySelector('a[href="#"]').addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'internships.html';
    });

    document.querySelector('a[href="#view-applications"]').addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'student-applications.html';
    });
});