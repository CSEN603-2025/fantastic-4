// js/scad-office-companies.js
document.addEventListener('DOMContentLoaded', () => {
    // Load companies from localStorage or initialize
    let companies = JSON.parse(localStorage.getItem('companyApplications')) || [];
    const tableBody = document.querySelector('#companiesTable tbody');
    const searchInput = document.getElementById('searchCompany');
    const industryFilter = document.getElementById('filterIndustry');
    const statusFilter = document.getElementById('filterStatus');
    
    // Modal elements
    const modal = document.getElementById('companyModal');
    const closeBtn = document.querySelector('.close');
    
    // Render companies table
    function renderCompanies(filteredCompanies = companies) {
        tableBody.innerHTML = '';
        filteredCompanies.forEach(company => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${company.name}</td>
                <td>${company.industry}</td>
                <td>${company.size}</td>
                <td class="status ${company.status || 'pending'}">${company.status || 'Pending'}</td>
                <td>
                    <button class="view-btn" data-id="${company.id}">View</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
        
        // Add event listeners to view buttons
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', () => viewCompanyDetails(btn.dataset.id));
        });
    }
    
    // View company details
    function viewCompanyDetails(companyId) {
        const company = companies.find(c => c.id === companyId);
        if (!company) return;
        
        document.getElementById('modalCompanyName').textContent = company.name;
        document.getElementById('modalIndustry').textContent = company.industry;
        document.getElementById('modalSize').textContent = company.size;
        document.getElementById('modalEmail').textContent = company.email;
        
        // Display documents (simplified - would need actual document handling)
        const docPreview = document.getElementById('documentPreview');
        docPreview.innerHTML = `
            <p>Proof Document: ${company.proofDoc?.name || 'Not available'}</p>
            <img src="${company.logoUrl || ''}" alt="Company Logo" style="max-width: 200px;">
        `;
        
        // Set up approve/reject buttons
        document.getElementById('approveBtn').onclick = () => updateCompanyStatus(companyId, 'approved');
        document.getElementById('rejectBtn').onclick = () => updateCompanyStatus(companyId, 'rejected');
        
        modal.style.display = 'block';
    }
    
    // Update company status
    function updateCompanyStatus(companyId, status) {
        const company = companies.find(c => c.id === companyId);
        if (company) {
            company.status = status;
            localStorage.setItem('companyApplications', JSON.stringify(companies));
            renderCompanies();
            modal.style.display = 'none';
            
            // In a real app, send email notification here
            console.log(`Status updated for ${company.name}. Email notification would be sent.`);
        }
    }
    
    // Filter companies
    function filterCompanies() {
        const searchTerm = searchInput.value.toLowerCase();
        const industry = industryFilter.value;
        const status = statusFilter.value;
        
        const filtered = companies.filter(company => {
            return (searchTerm === '' || company.name.toLowerCase().includes(searchTerm)) &&
                   (industry === '' || company.industry === industry) &&
                   (status === 'all' || company.status === status || 
                    (status === 'pending' && !company.status));
        });
        
        renderCompanies(filtered);
    }
    
    // Event listeners
    searchInput.addEventListener('input', filterCompanies);
    industryFilter.addEventListener('change', filterCompanies);
    statusFilter.addEventListener('change', filterCompanies);
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    // Initialize
    renderCompanies();
});