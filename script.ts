document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('Resumeform') as HTMLFormElement;
    const resumeDisplayElement = document.getElementById('resume-display') as HTMLDivElement;
    const shareableLinkContainer = document.getElementById('ShareableLinkContainer') as HTMLDivElement;
    const shareableLinkElement = document.getElementById('shareable-link') as HTMLAnchorElement;
    const downloadpdfButton = document.getElementById('download-pdf') as HTMLButtonElement;

    if (!form || !resumeDisplayElement || !shareableLinkContainer || !shareableLinkElement || !downloadpdfButton) {
        console.error('One or more elements could not be found.');
        return;
    }

    // Handle form submission
    form.addEventListener('submit', (event: Event) => {
        event.preventDefault(); // Prevent page reload

        // Collect input values
        const username = (document.getElementById('Username') as HTMLInputElement).value.trim();
        const name = (document.getElementById('name') as HTMLInputElement).value.trim();
        const email = (document.getElementById('email') as HTMLInputElement).value.trim();
        const phone = (document.getElementById('phone') as HTMLInputElement).value.trim();
        const education = (document.getElementById('education') as HTMLTextAreaElement).value.trim();
        const experience = (document.getElementById('experience') as HTMLTextAreaElement).value.trim();
        const skills = (document.getElementById('skills') as HTMLTextAreaElement).value.trim();

        // Basic input validation
        if (!username || !name || !email || !phone || !education || !experience || !skills) {
            alert('Please fill out all fields before generating the resume.');
            return;
        }

        // Save form data
        const resumeData = {
            name,
            email,
            phone,
            education,
            experience,
            skills
        };
        localStorage.setItem(username, JSON.stringify(resumeData));

        // Generate the resume content dynamically
        const resumeHTML = `
            <h2>Editable Resume</h2>
            <p><strong>Name:</strong> <span contenteditable="true">${name}</span></p>
            <p><strong>Email:</strong> <span contenteditable="true">${email}</span></p>
            <p><strong>Phone:</strong> <span contenteditable="true">${phone}</span></p>
            <h3>Education</h3>
            <p contenteditable="true">${education}</p>
            <h3>Experience</h3>
            <p contenteditable="true">${experience}</p>
            <h3>Skills</h3>
            <p contenteditable="true">${skills}</p>
        `;

        // Display the resume
        resumeDisplayElement.innerHTML = resumeHTML;

        // Generate shareable URL with username
        const shareableURL = `${window.location.origin}?username=${encodeURIComponent(username)}`;

        // Display the shareable link
        shareableLinkContainer.style.display = 'block';
        shareableLinkElement.href = shareableURL;
        shareableLinkElement.textContent = shareableURL;
    });

    // Download PDF (Print page)
    downloadpdfButton.addEventListener('click', () => {
        window.print();
    });

    // Refill form on page load
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');

    if (username) {
        const savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            const resumeData = JSON.parse(savedResumeData);

            (document.getElementById('Username') as HTMLInputElement).value = username;
            (document.getElementById('name') as HTMLInputElement).value = resumeData.name;
            (document.getElementById('email') as HTMLInputElement).value = resumeData.email;
            (document.getElementById('phone') as HTMLInputElement).value = resumeData.phone;
            (document.getElementById('education') as HTMLTextAreaElement).value = resumeData.education;
            (document.getElementById('experience') as HTMLTextAreaElement).value = resumeData.experience;
            (document.getElementById('skills') as HTMLTextAreaElement).value = resumeData.skills;
        }
    }
});