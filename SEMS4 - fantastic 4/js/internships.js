// js/internships.js
document.addEventListener('DOMContentLoaded', () => {
    // Get user role and set up UI accordingly
    const userRole = localStorage.getItem('userRole');
    const applicationSection = document.getElementById('applicationSection');
    const backLink = document.getElementById('backLink');
    
    // Set back link based on user role
    backLink.href = userRole ? `${userRole}-dashboard.html` : 'login.html';
    
    // Show application section only for students
    if (userRole === 'student' || userRole === 'pro-student') {
        applicationSection.classList.remove('hidden');
    }
    
    // Load all internships from all companies
    const allInternships = getAllInternships();
    const industries = [...new Set(allInternships.map(i => i.industry))];
    populateIndustryFilter(industries);
    
    // Render internships
    renderInternships(allInternships);
    
    // Set up filters
    document.getElementById('searchInternships').addEventListener('input', filterInternships);
    document.getElementById('filterIndustry').addEventListener('change', filterInternships);
    document.getElementById('filterDuration').addEventListener('change', filterInternships);
    document.getElementById('filterPaidStatus').addEventListener('change', filterInternships);
    
    // Application form submission
    document.getElementById('applicationForm')?.addEventListener('submit', handleApplication);
});

function getAllInternships() {
    // In a real app, this would come from a database
    // Here we'll combine internships from all companies
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

function renderInternships(internships) {
    const container = document.getElementById('internshipList');
    container.innerHTML = '';
    
    internships.forEach(internship => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${internship.title}</h3>
            <p class="company">${internship.companyName}</p>
            <div class="details">
                <p><strong>Duration:</strong> ${internship.duration}</p>
                <p><strong>Payment:</strong> ${internship.paidStatus}</p>
                ${internship.paidStatus === 'paid' ? `<p><strong>Salary:</strong> $${internship.salary}</p>` : ''}
            </div>
            <button class="view-btn" data-id="${internship.id}">View Details</button>
        `;
        container.appendChild(card);
    });
    
    // Add event listeners to view buttons
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', () => viewInternshipDetails(btn.dataset.id));
    });
}

function viewInternshipDetails(internshipId) {
    const allInternships = getAllInternships();
    const internship = allInternships.find(i => i.id === internshipId);
    if (!internship) return;
    
    // Populate modal
    document.getElementById('modalTitle').textContent = internship.title;
    document.getElementById('modalCompany').textContent = internship.companyName;
    document.getElementById('modalDuration').textContent = internship.duration;
    document.getElementById('modalPayment').textContent = internship.paidStatus;
    document.getElementById('modalSalary').textContent = internship.paidStatus === 'paid' ? `$${internship.salary}` : 'N/A';
    document.getElementById('modalSkills').textContent = internship.skills;
    document.getElementById('modalDescription').textContent = internship.description;
    
    // Show modal
    document.getElementById('internshipModal').style.display = 'block';
}

function filterInternships() {
    const searchTerm = document.getElementById('searchInternships').value.toLowerCase();
    const industry = document.getElementById('filterIndustry').value;
    const duration = document.getElementById('filterDuration').value;
    const paidStatus = document.getElementById('filterPaidStatus').value;
    
    const allInternships = getAllInternships();
    
    const filtered = allInternships.filter(internship => {
        const matchesSearch = internship.title.toLowerCase().includes(searchTerm) || 
                            internship.companyName.toLowerCase().includes(searchTerm);
        const matchesIndustry = !industry || internship.industry === industry;
        const matchesDuration = !duration || (
            (duration === '1-3' && internship.duration.includes('1-3')) ||
            (duration === '3-6' && internship.duration.includes('3-6')) ||
            (duration === '6+' && parseInt(internship.duration) >= 6)
        );
        const matchesPaidStatus = !paidStatus || internship.paidStatus === paidStatus;
        
        return matchesSearch && matchesIndustry && matchesDuration && matchesPaidStatus;
    });
    
    renderInternships(filtered);
}

function handleApplication(e) {
    e.preventDefault();
    // In a real app, this would submit to a server
    alert('Application submitted successfully!');
    document.getElementById('internshipModal').style.display = 'none';
}

function populateIndustryFilter(industries) {
    const filter = document.getElementById('filterIndustry');
    industries.forEach(industry => {
        const option = document.createElement('option');
        option.value = industry;
        option.textContent = industry;
        filter.appendChild(option);
    });
}