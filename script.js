document.getElementById("year").textContent = new Date().getFullYear();

(function () {
  const slides = document.querySelectorAll("#heroSlider img");
  if (slides.length < 2) return;
  let current = 0;
  setInterval(() => {
    slides[current].classList.remove("is-active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("is-active");
  }, 3000);
})();

(function () {
  const form = document.getElementById("contactForm");
  if (!form) return;
  const status = document.getElementById("formStatus");
  const button = form.querySelector("button[type='submit']");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    button.disabled = true;
    button.textContent = "Sending...";
    status.className = "form-status";
    status.textContent = "";

    fetch(form.action, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(form))),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Request failed");
        status.textContent = "Thanks! Your message has been sent.";
        status.classList.add("success");
        form.reset();
      })
      .catch(() => {
        status.textContent = "Something went wrong. Please try again in a moment.";
        status.classList.add("error");
      })
      .finally(() => {
        button.disabled = false;
        button.textContent = "Send message";
      });
  });
})();
