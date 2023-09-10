// Initialize EmailJS
emailjs.init("6prnV_QVjaoK7GT0x");
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById(
    "wf-form-handford-creative-contact-form"
  );

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const successMessage = document.querySelector(".success-message");
    const errorMessage = document.querySelector(".error-message");

    // Send the email using EmailJS
    emailjs.sendForm("service_qxa932b", "template_vq4s1cd", form).then(
      function (response) {
        console.log("Email sent successfully!", response);
        successMessage.classList.remove("--hidden");
        errorMessage.classList.add("--hidden");
      },
      function (error) {
        console.log("Failed to send the email.", error);
        errorMessage.classList.remove("--hidden");
        successMessage.classList.add("--hidden");
      }
    );
  });
});
