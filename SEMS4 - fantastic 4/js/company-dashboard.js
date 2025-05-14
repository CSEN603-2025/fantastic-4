// Check company approval status on load
document.addEventListener('DOMContentLoaded', () => {
    const companyName = localStorage.getItem('companyName');
    const companies = JSON.parse(localStorage.getItem('companyApplications')) || [];
    const company = companies.find(c => c.name === companyName);

    // Redirect if not approved
    if (!company || company.status !== 'approved') {
        alert('Your company has not been approved yet or registration is pending.');
        window.location.href = 'login.html';
        return;
    }

    // Initialize with company's internships
    let internships = company.internships || [];
    renderInternships();
});

// DOM elements
const form = document.getElementById('internshipForm');
const list = document.getElementById('internshipList');
const formSection = document.getElementById('formSection');
const showFormBtn = document.getElementById('showFormBtn');
let editingIndex = null;
let internships = [];

// Toggle form visibility
showFormBtn.addEventListener('click', () => {
    const isOpen = formSection.classList.contains('open');
    formSection.classList.toggle('open');
    showFormBtn.textContent = isOpen ? 'Add Internship' : 'Hide Form';
    if (!isOpen) form.title.focus();
});

// Render internships list
function renderInternships() {
    list.innerHTML = '';
    internships.forEach((job, index) => {
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `
            <h4>${job.title}</h4>
            <p><strong>Company:</strong> ${localStorage.getItem('companyName')}</p>
            <p><strong>Duration:</strong> ${job.duration}</p>
            <p><strong>Status:</strong> ${job.paidStatus}</p>
            ${job.paidStatus === 'paid' ? `<p><strong>Salary:</strong> $${job.salary}</p>` : ''}
            <p><strong>Skills:</strong> ${job.skills}</p>
            <div class="actions">
                <button onclick="editJob(${index})">Edit</button>
                <button onclick="deleteJob(${index})">Delete</button>
            </div>
        `;
        list.appendChild(div);
    });
}

// Save and render updates
function saveAndRender() {
    const companyName = localStorage.getItem('companyName');
    const companies = JSON.parse(localStorage.getItem('companyApplications')) || [];
    const companyIndex = companies.findIndex(c => c.name === companyName);

    if (companyIndex !== -1) {
        companies[companyIndex].internships = internships;
        localStorage.setItem('companyApplications', JSON.stringify(companies));
    }

    renderInternships();
}

// Form submission
form.addEventListener('submit', function (e) {
    e.preventDefault();

    const job = {
        id: Date.now().toString(),
        title: form.title.value.trim(),
        duration: form.duration.value.trim(),
        paidStatus: form.paidStatus.value,
        salary: form.paidStatus.value === 'paid' ? form.salary.value.trim() : null,
        skills: form.skills.value.trim(),
        description: form.description.value.trim(),
        postedDate: new Date().toISOString()
    };

    if (editingIndex !== null) {
        internships[editingIndex] = job;
    } else {
        internships.push(job);
    }

    saveAndRender();
    form.reset();
    formSection.classList.remove('open');
    showFormBtn.textContent = 'Add Internship';
    editingIndex = null;
});

// Edit job
window.editJob = function (index) {
    const job = internships[index];
    form.title.value = job.title;
    form.duration.value = job.duration;
    form.paidStatus.value = job.paidStatus;
    form.salary.value = job.salary || '';
    form.skills.value = job.skills;
    form.description.value = job.description;

    editingIndex = index;
    formSection.classList.add('open');
    showFormBtn.textContent = 'Hide Form';
    form.title.focus();
};

// Delete job
window.deleteJob = function (index) {
    if (confirm('Are you sure you want to delete this internship posting?')) {
        internships.splice(index, 1);
        saveAndRender();
    }
};