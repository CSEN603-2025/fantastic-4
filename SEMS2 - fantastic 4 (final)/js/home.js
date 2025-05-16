/**
 * home.js - Main JavaScript for the internship portal home page
 * Handles any home page specific functionality
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log('Home page loaded');

    // You can add any home page specific functionality here
    // For example: animations, analytics, or dynamic content

    // Example: Add click event listeners to track navigation
    const registerButton = document.querySelector('a[href="register.html"]');
    const loginButton = document.querySelector('a[href="login.html"]');

    if (registerButton) {
        registerButton.addEventListener('click', function () {
            console.log('User navigating to registration page');
            // You could add tracking or analytics here
        });
    }

    if (loginButton) {
        loginButton.addEventListener('click', function () {
            console.log('User navigating to login page');
            // You could add tracking or analytics here
        });
    }

    // Example: Check if user is already logged in (if you implement session storage)
    checkUserStatus();
});

function checkUserStatus() {
    // Check if user is already logged in (example using localStorage)
    const storedUser = localStorage.getItem('currentUser');

    if (storedUser) {
        const user = JSON.parse(storedUser);
        console.log(`User ${user.email} is already logged in`);

        // You could redirect automatically or show a different UI
        // window.location.href = user.role === 'student' ? 'student-dashboard.html' : 'company-dashboard.html';
    }
}

// Add any other home page specific functions here