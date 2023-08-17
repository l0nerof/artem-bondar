AOS.init({
  duration: 1000,
  easing: "ease",
  once: true,
});

const faqs = document.querySelectorAll(".faq");

faqs.forEach((faq) => {
  faq.addEventListener("click", () => {
    faq.classList.toggle("active");
  });
});
