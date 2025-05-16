document.addEventListener('DOMContentLoaded', () => {
    const roleSelect = document.getElementById('role');
    const companyFields = document.getElementById('companyFields');
    const studentNameInput = document.getElementById('studentName');
    const registerForm = document.getElementById('registerForm');

    // Toggle fields based on role selection
    roleSelect.addEventListener('change', function () {
        const role = this.value;
        companyFields.style.display = role === 'company' ? 'block' : 'none';
        studentNameInput.style.display = role === 'student' ? 'block' : 'none';
    });

    // Form submission
    registerForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const role = roleSelect.value;
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        if (role === 'company') {
            registerCompany(email, password);
        } else if (role === 'student') {
            registerStudent(email, password);
        } else {
            alert('Please select a valid role.');
        }
    });

    function registerCompany(email, password) {
        const name = document.getElementById('companyName').value.trim();
        const industry = document.getElementById('industry').value.trim();
        const size = document.getElementById('companySize').value.trim();
        const logo = document.getElementById('companyLogo').files[0];
        const proofDoc = document.getElementById('companyProof').files[0];

        // Validation
        if (!name || !industry || !size || !email || !password || !logo || !proofDoc) {
            alert('Please fill all fields and upload required documents.');
            return;
        }

        // Create company application
        const companyApplication = {
            id: Date.now().toString(),
            name,
            industry,
            size,
            email,
            logoUrl: URL.createObjectURL(logo),
            proofDoc: {
                name: proofDoc.name,
                size: proofDoc.size,
                type: proofDoc.type
            },
            status: 'pending',
            internships: [],
            createdAt: new Date().toISOString()
        };

        // Save to applications
        const applications = JSON.parse(localStorage.getItem('companyApplications')) || [];
        applications.push(companyApplication);
        localStorage.setItem('companyApplications', JSON.stringify(applications));

        // Save user credentials (in real app, this would be hashed)
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push({ email, password, role });
        localStorage.setItem('users', JSON.stringify(users));

        // Set current user
        localStorage.setItem('userRole', role);
        localStorage.setItem('companyName', name);

        // Send notification
        const emailBody = `Dear ${name},\n\nYour registration has been received and is pending approval. ` +
            `You will receive another email once your application has been reviewed.\n\nSCAD Team`;

        // In a real app, call EmailService.send(email, "Registration Received", emailBody);
        console.log('Email would be sent:', { email, subject: "Registration Received", body: emailBody });

        alert('Registration submitted for approval! You will be notified via email.');
        window.location.href = 'login.html';
    }

    function registerStudent(email, password) {
        const fullName = document.getElementById('studentName').value.trim();

        if (!fullName || !email || !password) {
            alert('Please fill all required fields.');
            return;
        }

        // Save user credentials (in real app, this would be hashed)
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push({ email, password, role: 'student' });
        localStorage.setItem('users', JSON.stringify(users));

        // Create student profile
        const studentProfile = {
            fullName,
            email,
            major: '',
            semester: 1,
            interests: [],
            experiences: [],
            activities: [],
            createdAt: new Date().toISOString()
        };

        localStorage.setItem('studentProfile', JSON.stringify(studentProfile));
        localStorage.setItem('userRole', 'student');
        localStorage.setItem('studentName', fullName);

        alert('Registration successful!');
        window.location.href = 'student-dashboard.html';
    }
});