// Mobile menu toggle

window.addEventListener("scroll", () => {
  const scrolled = window.scrollY;
  const height = document.body.scrollHeight - window.innerHeight;
  const width = (scrolled / height) * 100;
  document.getElementById("progress-bar").style.width = width + "%";
});


const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

const mobileMenuLinks = document.querySelectorAll('#mobile-menu a, header nav a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        setTimeout(() => {
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }, 100);
    });
});

// Scroll Animation
const animatedElements = document.querySelectorAll('.fade-in-up');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

animatedElements.forEach(element => observer.observe(element));
