var Form = document.getElementById('resumeForm');
var resumedisplayElement = document.getElementById('resumeOutput');
var shareablelinkContainer = document.getElementById('sharable-link-container');
var sharablelinkElement = document.getElementById('sharable-link');
var downloadpdfButton = document.getElementById('download-pdf');
//handle form submission..
// Tabnine:Edit|Test|Fix|Explain|Document|Ask
Form.addEventListener('submit', function (event) {
    event.preventDefault();
    //collectInputvalues..
    var username = document.getElementById('username').value;
    var name = document.getElementById('name').value;
    var whatsapp = document.getElementById('Whatsapp').value;
    var email = document.getElementById('email').value;
    var education = document.getElementById('education').value;
    var experience = document.getElementById('experience').value;
    var skills = document.getElementById('skills').value;
    var description = document.getElementById('description').value;
    //save form data in localStorage with username as the key
    var resumeData = { name: name, whatsapp: whatsapp, email: email, education: education, experience: experience, skills: skills, description: description };
    localStorage.setItem(username, JSON.stringify(resumeData));
    //dynamic resume generate
    var resumeHTML = " \n\n    <h2>Personal Information</h2>\n    <p><strong>Name:</strong>".concat(name, "</p>\n    <p><strong>Whatsapp:</strong>").concat(whatsapp, "</p>\n    <p><strong>Email:</strong>").concat(email, "</p>\n    <p><strong>Education:</strong>").concat(education, "</p>\n    <p><strong>Experience:</strong>").concat(experience, "</p>\n    <p><strong>Skills:</strong>").concat(skills, "</p>\n    <p><strong>Description:</strong>").concat(description, "</p>\n    ");
    //display resume
    resumedisplayElement.innerHTML = resumeHTML;
    //generate a sharable URL with the username
    var sharableURL = '${window.location.origin}$ username=${encodeURLComponent(username)}';
    //display the Link
    shareablelinkContainer.style.display = "block";
    sharablelinkElement.href = "sharableURL";
    sharablelinkElement.textContent = "sharableURL";
});
//pdf downloader
downloadpdfButton.addEventListener("click", function () {
    window.print();
});
// prefill the form based on the username url
window.addEventListener("DOMContentLoaded", function () {
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get("username");
    if (username) {
        var savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            //autofill form
            var ResumeData = JSON.parse(savedResumeData);
            document.getElementById('username').value = username;
            document.getElementById('name').value = ResumeData.name;
            document.getElementById('whatsapp').value = ResumeData.whatsapp;
            document.getElementById('email').value = ResumeData.email;
            document.getElementById('education').value = ResumeData.education;
            document.getElementById('experience').value = ResumeData.experience;
            document.getElementById('skills').value = ResumeData.skills;
            document.getElementById('description').value = ResumeData.description;
        }
    }
});
