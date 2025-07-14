// Imposta anno corrente nel footer
document.getElementById("anno").textContent = new Date().getFullYear();

// Esegui tutto dopo che il DOM è pronto
document.addEventListener("DOMContentLoaded", function () {
  // Scroll fluido per ancore
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

const toggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const overlay = document.querySelector('.menu-overlay');
const links = navLinks.querySelectorAll("a");

toggle.addEventListener("click", () => {
  toggle.classList.toggle("active");
  navLinks.classList.toggle("active");
  overlay.classList.toggle("active");
});

overlay.addEventListener("click", closeMenu);
links.forEach(link => link.addEventListener("click", closeMenu));

function closeMenu() {
  toggle.classList.remove("active");
  navLinks.classList.remove("active");
  overlay.classList.remove("active");
}
  // Mostra/chiudi icone contatti
  const toggleBtn = document.getElementById("toggleContact");
  const icons = document.getElementById("contactIcons");
  let autoCloseTimeout;

  toggleBtn.addEventListener("click", () => {
    icons.classList.toggle("active");
    clearTimeout(autoCloseTimeout);
    if (icons.classList.contains("active")) {
      autoCloseTimeout = setTimeout(() => {
        icons.classList.remove("active");
      }, 5000);
    }
  });

  icons.classList.remove("active");
});

// Contatori animati
document.addEventListener("DOMContentLoaded", function () {
  const counters = document.querySelectorAll('.numero');

  const animateCounter = (el, target, duration) => {
    const startTime = performance.now();
    const from = 0;

    const update = (now) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);

      // Easing "ease-out cubic": rallenta verso la fine
      const progress = 1 - Math.pow(1 - t, 2);

      const current = Math.floor(from + (target - from) * progress);
      el.textContent = current.toLocaleString("it-IT");

      if (t < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  };

  const runAllCounters = () => {
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'), 10);
      animateCounter(counter, target, 6000); // 2000 ms = 2 secondi
    });
  };

  // Avvio quando visibile
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        runAllCounters();
        observer.disconnect();
      }
    });
  }, { threshold: 0.4 });

  const stats = document.querySelector('.statistiche');
  if (stats) counterObserver.observe(stats);
});


// Animazioni in entrata
const items = document.querySelectorAll('.fade-in, .left, .right');

const io = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const children = entry.target.querySelectorAll(':scope > *');
      children.forEach((child, index) => {
        child.style.transitionDelay = `${index * 2000}ms`;
      });
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

items.forEach(el => io.observe(el));

// Animazioni per servizi
const serviziObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.servizio').forEach(el => serviziObserver.observe(el));

// Preloader
window.addEventListener("load", function () {
  const preloader = document.getElementById("preloader");
  preloader.style.opacity = "0";
  setTimeout(() => {
    preloader.style.display = "none";
  }, 400);
});

// Bottone "torna su"
const backToHome = document.querySelector('.back-to-home');

window.addEventListener('scroll', () => {
  if (window.scrollY > 600) {
    backToHome.classList.add('visible');
  } else {
    backToHome.classList.remove('visible');
  }
});

window.addEventListener('DOMContentLoaded', () => {
  if (window.innerWidth < 1200) { 
    const grid = document.querySelector('.servizi-grid');
    const servizi = [...grid.children];
    servizi.forEach(servizio => {
      const clone = servizio.cloneNode(true);
      grid.appendChild(clone);
    });
  }
});

document.querySelectorAll('.servizio').forEach(element => {
  element.addEventListener('click', function(event) {
    event.preventDefault();

    // Provo a prendere href o data-target
    let targetId = this.getAttribute('href') || this.getAttribute('data-target');

    if (!targetId) {
      console.warn('Elemento senza href o data-target:', this);
      return;
    }

    // Se targetId inizia con # lo rimuovo
    if (targetId.startsWith('#')) targetId = targetId.substring(1);

    const target = document.getElementById(targetId);

    if (!target) {
      console.warn('Elemento target non trovato con id:', targetId);
      return;
    }

    // Scroll dolce verso il target
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Aggiungo la classe highlight dopo 500ms, la tolgo dopo 2s
    setTimeout(() => {
      target.classList.add('highlight');
      setTimeout(() => {
        target.classList.remove('highlight');
      }, 2000);
    }, 500);
  });
});