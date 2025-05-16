// coordinator-cycle.js
document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    const saveDatesBtn = document.getElementById('saveDates');
    const studentFilter = document.querySelector('.student-filter');
    const studentsTable = document.querySelector('.data-table tbody');

    // Current Cycle Dates (would normally come from backend)
    let currentCycle = {
        startDate: '2025-06-01',
        endDate: '2025-08-31'
    };

    // Sample Student Data (would normally come from backend)
    let students = [
        { id: 1, name: 'Student A', email: 'a@example.com', status: 'active', major: 'CS', semester: 6 },
        { id: 2, name: 'Student B', email: 'b@example.com', status: 'active', major: 'ENG', semester: 4 },
        { id: 3, name: 'Student C', email: 'c@example.com', status: 'inactive', major: 'CS', semester: 7 }
    ];

    // Initialize the page
    function initPage() {
        // Set current cycle dates
        startDateInput.value = currentCycle.startDate;
        endDateInput.value = currentCycle.endDate;

        // Populate students table
        renderStudentsTable(students);

        // Set up event listeners
        setupEventListeners();
    }

    // Render students table
    function renderStudentsTable(studentsData) {
        studentsTable.innerHTML = '';

        studentsData.forEach(student => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.email}</td>
                <td><span class="status-badge ${student.status}">${student.status === 'active' ? 'Active' : 'Inactive'}</span></td>
                <td>
                    <button class="icon-btn edit-btn" title="Edit" data-id="${student.id}"></button>
                    <button class="icon-btn archive-btn" title="Archive" data-id="${student.id}"></button>
                </td>
            `;

            studentsTable.appendChild(row);
        });
    }

    // Filter students by name or email
    function filterStudents(searchTerm) {
        const filtered = students.filter(student =>
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        renderStudentsTable(filtered);
    }

    // Save cycle dates (would normally call API)
    function saveCycleDates() {
        const newStartDate = startDateInput.value;
        const newEndDate = endDateInput.value;

        if (!newStartDate || !newEndDate) {
            showAlert('Please select both start and end dates', 'error');
            return;
        }

        if (new Date(newStartDate) >= new Date(newEndDate)) {
            showAlert('End date must be after start date', 'error');
            return;
        }

        // Simulate API call
        simulateAPICall('/api/cycle-dates', {
            method: 'POST',
            body: JSON.stringify({
                startDate: newStartDate,
                endDate: newEndDate
            })
        })
            .then(() => {
                currentCycle.startDate = newStartDate;
                currentCycle.endDate = newEndDate;
                showAlert('Cycle dates updated successfully!', 'success');

                // Requirement #50: Notify students when cycle changes
                notifyStudentsAboutNewCycle();
            })
            .catch(error => {
                showAlert('Failed to update cycle dates: ' + error.message, 'error');
            });
    }

    // Requirement #50: Notify students about new cycle
    function notifyStudentsAboutNewCycle() {
        simulateAPICall('/api/notifications', {
            method: 'POST',
            body: JSON.stringify({
                type: 'cycle_update',
                message: `New internship cycle: ${formatDate(currentCycle.startDate)} to ${formatDate(currentCycle.endDate)}`,
                recipients: 'all_students'
            })
        });
    }

    // Format date for display
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    // Show alert message
    function showAlert(message, type) {
        const alert = document.createElement('div');
        alert.className = `alert ${type}`;
        alert.textContent = message;
        document.body.appendChild(alert);

        setTimeout(() => {
            alert.remove();
        }, 5000);
    }

    // Simulate API call (for demo purposes)
    function simulateAPICall(url, options) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate random success/failure
                if (Math.random() > 0.2) {
                    resolve({ status: 'success' });
                } else {
                    reject(new Error('Network error'));
                }
            }, 1000);
        });
    }

    // Set up event listeners
    function setupEventListeners() {
        // Save cycle dates
        saveDatesBtn.addEventListener('click', saveCycleDates);

        // Filter students
        studentFilter.addEventListener('input', (e) => {
            filterStudents(e.target.value);
        });

        // Edit/Archive student buttons
        studentsTable.addEventListener('click', (e) => {
            const btn = e.target.closest('button');
            if (!btn) return;

            const studentId = parseInt(btn.dataset.id);
            const student = students.find(s => s.id === studentId);

            if (btn.classList.contains('edit-btn')) {
                editStudent(student);
            } else if (btn.classList.contains('archive-btn')) {
                toggleStudentStatus(student);
            }
        });
    }

    // Edit student (would open modal in real implementation)
    function editStudent(student) {
        console.log('Editing student:', student);
        // In a real implementation, this would open an edit modal
        showAlert(`Edit functionality would open for ${student.name}`, 'info');
    }

    // Toggle student status
    function toggleStudentStatus(student) {
        student.status = student.status === 'active' ? 'inactive' : 'active';

        // Simulate API call to update status
        simulateAPICall(`/api/students/${student.id}`, {
            method: 'PATCH',
            body: JSON.stringify({ status: student.status })
        })
            .then(() => {
                renderStudentsTable(students);
                showAlert(`Student ${student.name} status updated to ${student.status}`, 'success');
            })
            .catch(error => {
                showAlert(`Failed to update student status: ${error.message}`, 'error');
            });
    }

    // Initialize the page
    initPage();
});