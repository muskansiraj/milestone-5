document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('Resumeform');
    var resumeDisplayElement = document.getElementById('resume-display');
    var shareableLinkContainer = document.getElementById('ShareableLinkContainer');
    var shareableLinkElement = document.getElementById('shareable-link');
    var downloadpdfButton = document.getElementById('download-pdf');
    if (!form || !resumeDisplayElement || !shareableLinkContainer || !shareableLinkElement || !downloadpdfButton) {
        console.error('One or more elements could not be found.');
        return;
    }
    // Handle form submission
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent page reload
        // Collect input values
        var username = document.getElementById('Username').value.trim();
        var name = document.getElementById('name').value.trim();
        var email = document.getElementById('email').value.trim();
        var phone = document.getElementById('phone').value.trim();
        var education = document.getElementById('education').value.trim();
        var experience = document.getElementById('experience').value.trim();
        var skills = document.getElementById('skills').value.trim();
        // Basic input validation
        if (!username || !name || !email || !phone || !education || !experience || !skills) {
            alert('Please fill out all fields before generating the resume.');
            return;
        }
        // Save form data
        var resumeData = {
            name: name,
            email: email,
            phone: phone,
            education: education,
            experience: experience,
            skills: skills
        };
        localStorage.setItem(username, JSON.stringify(resumeData));
        // Generate the resume content dynamically
        var resumeHTML = "\n            <h2>Editable Resume</h2>\n            <p><strong>Name:</strong> <span contenteditable=\"true\">".concat(name, "</span></p>\n            <p><strong>Email:</strong> <span contenteditable=\"true\">").concat(email, "</span></p>\n            <p><strong>Phone:</strong> <span contenteditable=\"true\">").concat(phone, "</span></p>\n            <h3>Education</h3>\n            <p contenteditable=\"true\">").concat(education, "</p>\n            <h3>Experience</h3>\n            <p contenteditable=\"true\">").concat(experience, "</p>\n            <h3>Skills</h3>\n            <p contenteditable=\"true\">").concat(skills, "</p>\n        ");
        // Display the resume
        resumeDisplayElement.innerHTML = resumeHTML;
        // Generate shareable URL with username
        var shareableURL = "".concat(window.location.origin, "?username=").concat(encodeURIComponent(username));
        // Display the shareable link
        shareableLinkContainer.style.display = 'block';
        shareableLinkElement.href = shareableURL;
        shareableLinkElement.textContent = shareableURL;
    });
    // Download PDF (Print page)
    downloadpdfButton.addEventListener('click', function () {
        window.print();
    });
    // Refill form on page load
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get('username');
    if (username) {
        var savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            var resumeData = JSON.parse(savedResumeData);
            document.getElementById('Username').value = username;
            document.getElementById('name').value = resumeData.name;
            document.getElementById('email').value = resumeData.email;
            document.getElementById('phone').value = resumeData.phone;
            document.getElementById('education').value = resumeData.education;
            document.getElementById('experience').value = resumeData.experience;
            document.getElementById('skills').value = resumeData.skills;
        }
    }
});
