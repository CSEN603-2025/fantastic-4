document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("loginForm").addEventListener("submit", function (e) {
        e.preventDefault();

        // Get form values
        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;
        const role = document.getElementById("loginRole").value;

        // Test credentials for all roles
        const testAccounts = {
            student: {
                email: "student@test.com",
                password: "student123",
                redirect: "student-dashboard.html",
                data: { name: "Test Student", university: "Test University" }
            },
            "pro-student": {
                email: "prostudent@test.com",
                password: "pro123",
                redirect: "pro-student-dashboard.html",
                data: { name: "Test PRO Student", university: "Test University" }
            },
            company: {
                email: "company@test.com",
                password: "company123",
                redirect: "company-dashboard.html",
                data: { name: "Test Company", industry: "Technology" }
            },
            coordinator: {
                email: "coordinator@test.com",
                password: "coord123",
                redirect: "coordinator-dashboard.html",
                data: { name: "Test Coordinator", department: "Career Services" }
            },
            faculty: {
                email: "faculty@test.com",
                password: "faculty123",
                redirect: "faculty-dashboard.html",
                data: { name: "Test Professor", department: "Computer Science" }
            }
        };

        // Validate inputs
        if (!email || !password || !role) {
            alert("Please fill in all required fields");
            return;
        }

        // Check credentials
        let isValid = false;
        for (const [roleType, account] of Object.entries(testAccounts)) {
            if (email === account.email && password === account.password && role === roleType) {
                localStorage.setItem('currentUser', JSON.stringify({
                    email: email,
                    role: role,
                    ...account.data
                }));
                window.location.href = account.redirect;
                isValid = true;
                break;
            }
        }

        if (!isValid) {
            alert(`Invalid credentials or role mismatch\n\nTest accounts:\n
Student: student@test.com / student123\n
PRO Student: prostudent@test.com / pro123\n
Company: company@test.com / company123\n
Coordinator: coordinator@test.com / coord123\n
Faculty: faculty@test.com / faculty123`);
        }
    });
});