document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".scroll-fade");
  
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    }, { threshold: 0.2 });
  
    elements.forEach(el => {
      observer.observe(el);
    });
  
    // Contact form logic (can be expanded to use email API or backend)
    document.getElementById("contactForm").addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thank you for your message! We'll get back to you soon.");
      e.target.reset();
    });
  });
  