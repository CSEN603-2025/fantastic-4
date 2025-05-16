// js/email-service.js
class EmailService {
    static send(to, subject, body) {
        // In a real app, this would connect to an email service
        console.log(`Email to: ${to}`);
        console.log(`Subject: ${subject}`);
        console.log(`Body: ${body}`);

        // Store notifications for display in UI
        const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
        notifications.push({
            to,
            subject,
            body,
            read: false,
            date: new Date().toISOString()
        });
        localStorage.setItem('notifications', JSON.stringify(notifications));
    }
}

// Example usage:
// EmailService.send('company@example.com', 'Application Status Update', 'Your application has been approved!');