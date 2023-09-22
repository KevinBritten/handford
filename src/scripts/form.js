import emailjs from "@emailjs/browser";

emailjs.init("6prnV_QVjaoK7GT0x");
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById(
    "wf-form-handford-creative-contact-form"
  );

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const successMessage = document.querySelector(".success-message");
    const errorMessage = document.querySelector(".error-message");
    const submitButton = form.querySelector(".btn-submit");
    submitButton.value = "Sending...";

    // Send the email using EmailJS
    emailjs.sendForm("service_qxa932b", "template_vq4s1cd", form).then(
      function (response) {
        submitButton.value = "Send";
        successMessage.classList.remove("--hidden");
        errorMessage.classList.add("--hidden");
      },
      function (error) {
        submitButton.value = "Send";
        errorMessage.classList.remove("--hidden");
        successMessage.classList.add("--hidden");
      }
    );
  });
});
