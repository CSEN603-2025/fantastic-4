// js/student-profile.js
document.addEventListener('DOMContentLoaded', () => {
    // Load student data
    const studentData = JSON.parse(localStorage.getItem('studentProfile')) || {};
    const form = document.getElementById('profileForm');

    // Populate form
    if (studentData) {
        document.getElementById('fullName').value = studentData.fullName || '';
        document.getElementById('email').value = studentData.email || '';
        document.getElementById('major').value = studentData.major || '';
        document.getElementById('semester').value = studentData.semester || '';
        document.getElementById('interests').value = studentData.interests?.join(', ') || '';

        // Load experiences
        if (studentData.experiences) {
            studentData.experiences.forEach(exp => addExperienceEntry(exp));
        }

        // Load activities
        if (studentData.activities) {
            studentData.activities.forEach(act => addActivityEntry(act));
        }
    }

    // Add experience button
    document.getElementById('addExperience').addEventListener('click', () => {
        addExperienceEntry();
    });

    // Add activity button
    document.getElementById('addActivity').addEventListener('click', () => {
        addActivityEntry();
    });

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const profileData = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            major: document.getElementById('major').value,
            semester: parseInt(document.getElementById('semester').value),
            interests: document.getElementById('interests').value.split(',').map(i => i.trim()),
            experiences: getExperienceData(),
            activities: getActivityData()
        };

        localStorage.setItem('studentProfile', JSON.stringify(profileData));
        alert('Profile saved successfully!');
    });
});

function addExperienceEntry(experience = {}) {
    const container = document.getElementById('experienceEntries');
    const entryId = Date.now();

    const entry = document.createElement('div');
    entry.className = 'entry';
    entry.dataset.id = entryId;
    entry.innerHTML = `
        <div class="form-group">
            <label>Company Name</label>
            <input type="text" value="${experience.company || ''}" required>
        </div>
        <div class="form-group">
            <label>Position</label>
            <input type="text" value="${experience.position || ''}" required>
        </div>
        <div class="form-group">
            <label>Duration (months)</label>
            <input type="number" value="${experience.duration || ''}" required>
        </div>
        <div class="form-group">
            <label>Responsibilities</label>
            <textarea>${experience.responsibilities || ''}</textarea>
        </div>
        <button type="button" class="remove-btn">Remove</button>
    `;

    container.appendChild(entry);
    entry.querySelector('.remove-btn').addEventListener('click', () => {
        container.removeChild(entry);
    });
}

function addActivityEntry(activity = {}) {
    const container = document.getElementById('activityEntries');
    const entryId = Date.now();

    const entry = document.createElement('div');
    entry.className = 'entry';
    entry.dataset.id = entryId;
    entry.innerHTML = `
        <div class="form-group">
            <label>Activity Name</label>
            <input type="text" value="${activity.name || ''}" required>
        </div>
        <div class="form-group">
            <label>Role</label>
            <input type="text" value="${activity.role || ''}">
        </div>
        <div class="form-group">
            <label>Duration</label>
            <input type="text" value="${activity.duration || ''}">
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea>${activity.description || ''}</textarea>
        </div>
        <button type="button" class="remove-btn">Remove</button>
    `;

    container.appendChild(entry);
    entry.querySelector('.remove-btn').addEventListener('click', () => {
        container.removeChild(entry);
    });
}

function getExperienceData() {
    const entries = Array.from(document.getElementById('experienceEntries').children);
    return entries.map(entry => ({
        company: entry.querySelector('input[type="text"]').value,
        position: entry.querySelectorAll('input[type="text"]')[1].value,
        duration: parseInt(entry.querySelector('input[type="number"]').value),
        responsibilities: entry.querySelector('textarea').value
    }));
}

function getActivityData() {
    const entries = Array.from(document.getElementById('activityEntries').children);
    return entries.map(entry => ({
        name: entry.querySelector('input[type="text"]').value,
        role: entry.querySelectorAll('input[type="text"]')[1].value,
        duration: entry.querySelectorAll('input[type="text"]')[2].value,
        description: entry.querySelector('textarea').value
    }));
}