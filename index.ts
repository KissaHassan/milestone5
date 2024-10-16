// Get the DOM elements and handle null cases
const form = document.getElementById('resumeForm') as HTMLFormElement | null;
const resumeDisplayElement = document.getElementById('resumeOutput') as HTMLDivElement | null;
const shareableLinkContainer = document.getElementById('sharable-link-container') as HTMLDivElement | null;
const sharableLinkElement = document.getElementById('sharable-link') as HTMLAnchorElement | null;
const downloadPDFButton = document.getElementById('download-pdf') as HTMLButtonElement | null;

// Check if all elements exist before proceeding
if (form && resumeDisplayElement && shareableLinkContainer && sharableLinkElement && downloadPDFButton) {
    
    // Handle form submission
    form.addEventListener('submit', (event: Event) => {
        event.preventDefault();

        // Collect input values from the form
        const username = (document.getElementById('username') as HTMLInputElement).value;
        const name = (document.getElementById('name') as HTMLInputElement).value;
        const whatsapp = (document.getElementById('whatsapp') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const education = (document.getElementById('education') as HTMLInputElement).value;
        const experience = (document.getElementById('experience') as HTMLInputElement).value;
        const skills = (document.getElementById('skills') as HTMLInputElement).value;
        const description = (document.getElementById('description') as HTMLInputElement).value;

        // Save form data in localStorage with username as the key
        const resumeData = { name, whatsapp, email, education, experience, skills, description };
        localStorage.setItem(username, JSON.stringify(resumeData));

        // Dynamically generate the resume HTML
        const resumeHTML = `
            <h2>Personal Information</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Whatsapp:</strong> ${whatsapp}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Education:</strong> ${education}</p>
            <p><strong>Experience:</strong> ${experience}</p>
            <p><strong>Skills:</strong> ${skills}</p>
            <p><strong>Description:</strong> ${description}</p>
        `;

        // Display the resume on the page
        resumeDisplayElement.innerHTML = resumeHTML;

        // Generate a sharable URL with the username
        const sharableURL = `${window.location.origin}?username=${encodeURIComponent(username)}`;

        // Display the shareable link
        shareableLinkContainer.style.display = "block";
        sharableLinkElement.href = sharableURL;
        sharableLinkElement.textContent = sharableURL;
    });

    // PDF downloader functionality
    downloadPDFButton.addEventListener("click", () => {
        window.print();
    });

    // Prefill the form based on the username URL
    window.addEventListener("DOMContentLoaded", () => {
        const urlParams = new URLSearchParams(window.location.search);
        const username = urlParams.get("username");

        if (username) {
            const savedResumeData = localStorage.getItem(username);
            if (savedResumeData) {
                // Autofill the form with saved data
                const resumeData = JSON.parse(savedResumeData);
                (document.getElementById('username') as HTMLInputElement).value = username;
                (document.getElementById('name') as HTMLInputElement).value = resumeData.name;
                (document.getElementById('whatsapp') as HTMLInputElement).value = resumeData.whatsapp;
                (document.getElementById('email') as HTMLInputElement).value = resumeData.email;
                (document.getElementById('education') as HTMLInputElement).value = resumeData.education;
                (document.getElementById('experience') as HTMLInputElement).value = resumeData.experience;
                (document.getElementById('skills') as HTMLInputElement).value = resumeData.skills;
                (document.getElementById('description') as HTMLInputElement).value = resumeData.description;
            }
        }
    });
} else {
    console.error("One or more elements are not found in the DOM.");
}
