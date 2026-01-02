/* ===================================
   ILA IKRAM - Professional Portfolio
   Mind-Blowing Animations & Effects
   =================================== */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
   initApp();
});

// Initialize all components
function initApp() {
   initCursorGlow();
   initSubtleStars();
   initNavigation();
   initTypingAnimation();
   initMindBlowingScrollReveal();
   initCounterAnimation();
   initSmoothScroll();
   initParallaxEffect();
   initMagneticButtons();
   initTextSplit();
   initProjectHover();
}

/* ===================================
   Cursor Glow Effect
   =================================== */
function initCursorGlow() {
   const cursorGlow = document.getElementById('cursor-glow');
   if (!cursorGlow) return;

   let mouseX = 0;
   let mouseY = 0;
   let currentX = 0;
   let currentY = 0;

   document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
   });

   function animate() {
      // Smooth follow with lag
      currentX += (mouseX - currentX) * 0.08;
      currentY += (mouseY - currentY) * 0.08;

      cursorGlow.style.left = currentX + 'px';
      cursorGlow.style.top = currentY + 'px';

      requestAnimationFrame(animate);
   }

   animate();

   // Hide on mobile
   if ('ontouchstart' in window) {
      cursorGlow.style.display = 'none';
   }
}

/* ===================================
   Subtle Stars Generator
   =================================== */
function initSubtleStars() {
   const starsContainer = document.getElementById('stars');
   if (!starsContainer) return;

   const starCount = 50;
   const fragment = document.createDocumentFragment();

   for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      const size = Math.random() * 2 + 0.5;
      star.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: white;
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.3 + 0.1};
            animation: subtleTwinkle ${Math.random() * 6 + 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 4}s;
        `;
      fragment.appendChild(star);
   }

   starsContainer.appendChild(fragment);

   // Add animation style
   const style = document.createElement('style');
   style.textContent = `
        @keyframes subtleTwinkle {
            0%, 100% { opacity: 0.1; }
            50% { opacity: 0.4; }
        }
    `;
   document.head.appendChild(style);
}

/* ===================================
   Navigation
   =================================== */
function initNavigation() {
   const navbar = document.getElementById('navbar');
   const navToggle = document.getElementById('nav-toggle');
   const navMenu = document.getElementById('nav-menu');
   const navLinks = document.querySelectorAll('.nav-link');

   // Scroll effect
   window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
         navbar.classList.add('scrolled');
      } else {
         navbar.classList.remove('scrolled');
      }
   });

   // Mobile menu toggle
   navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
   });

   // Close on link click
   navLinks.forEach(link => {
      link.addEventListener('click', () => {
         navToggle.classList.remove('active');
         navMenu.classList.remove('active');
         document.body.style.overflow = '';
      });
   });

   // Active section tracking
   const sections = document.querySelectorAll('section[id]');

   window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
         const sectionTop = section.offsetTop;
         const sectionHeight = section.offsetHeight;
         const sectionId = section.getAttribute('id');
         const navLink = document.querySelector(`.nav-link[data-section="${sectionId}"]`);

         if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
         }
      });
   });
}

/* ===================================
   Typing Animation
   =================================== */
function initTypingAnimation() {
   const typingElement = document.getElementById('typing-text');
   if (!typingElement) return;

   const roles = [
      'Web Developer',
      'App Developer',
      'Full Stack Developer',
      'IoT Specialist',
      'Problem Solver'
   ];

   let roleIndex = 0;
   let charIndex = 0;
   let isDeleting = false;
   let typingSpeed = 80;

   function type() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
         typingElement.textContent = currentRole.substring(0, charIndex - 1);
         charIndex--;
         typingSpeed = 40;
      } else {
         typingElement.textContent = currentRole.substring(0, charIndex + 1);
         charIndex++;
         typingSpeed = 80;
      }

      if (!isDeleting && charIndex === currentRole.length) {
         typingSpeed = 2500;
         isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
         isDeleting = false;
         roleIndex = (roleIndex + 1) % roles.length;
         typingSpeed = 400;
      }

      setTimeout(type, typingSpeed);
   }

   setTimeout(type, 1500);
}

/* ===================================
   Mind-Blowing Scroll Reveal
   =================================== */
function initMindBlowingScrollReveal() {
   // Select all elements with reveal classes
   const revealElements = document.querySelectorAll('.reveal, .reveal-stagger, .reveal-left, .reveal-right, .reveal-scale, .reveal-rotate');

   // Intersection Observer with stagger support
   const observerOptions = {
      root: null,
      rootMargin: '-50px',
      threshold: 0.1
   };

   const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
         if (entry.isIntersecting) {
            // Get delay from style or data attribute
            const delay = entry.target.style.transitionDelay || '0s';

            // Add active class with a slight delay for stagger effect
            setTimeout(() => {
               entry.target.classList.add('active');
            }, parseFloat(delay) * 1000);

            // Optional: unobserve after animation
            // revealObserver.unobserve(entry.target);
         }
      });
   }, observerOptions);

   revealElements.forEach(element => {
      revealObserver.observe(element);
   });

   // Add custom scroll-based parallax for sections
   initScrollParallax();
}

/* ===================================
   Scroll-Based Parallax
   =================================== */
function initScrollParallax() {
   const sections = document.querySelectorAll('.section');

   window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;

      sections.forEach(section => {
         const sectionTop = section.offsetTop;
         const sectionHeight = section.offsetHeight;
         const scrollProgress = (scrolled - sectionTop + window.innerHeight) / (sectionHeight + window.innerHeight);

         if (scrollProgress > 0 && scrollProgress < 1) {
            // Apply subtle parallax to section headers
            const header = section.querySelector('.section-header');
            if (header) {
               const moveY = (scrollProgress - 0.5) * 30;
               header.style.transform = `translateY(${moveY}px)`;
            }
         }
      });
   });

   // Scroll progress indicator
   const updateScrollProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      // Update CSS variable for potential use
      document.documentElement.style.setProperty('--scroll-progress', scrollPercent + '%');
   };

   window.addEventListener('scroll', updateScrollProgress);
}

/* ===================================
   Counter Animation
   =================================== */
function initCounterAnimation() {
   const counters = document.querySelectorAll('.stat-number[data-count]');

   function animateCounter(counter) {
      const target = parseInt(counter.getAttribute('data-count'));
      const duration = 2500;
      const startTime = performance.now();

      function updateCounter(currentTime) {
         const elapsed = currentTime - startTime;
         const progress = Math.min(elapsed / duration, 1);

         // Easing function (ease-out-expo)
         const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
         const current = Math.floor(easeOut * target);

         counter.textContent = current;

         if (progress < 1) {
            requestAnimationFrame(updateCounter);
         } else {
            counter.textContent = target;
         }
      }

      requestAnimationFrame(updateCounter);
   }

   // Use Intersection Observer
   const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
         if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
         }
      });
   }, { threshold: 0.5 });

   counters.forEach(counter => observer.observe(counter));
}

/* ===================================
   Smooth Scroll
   =================================== */
function initSmoothScroll() {
   document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
         e.preventDefault();
         const targetId = this.getAttribute('href');
         const targetElement = document.querySelector(targetId);

         if (targetElement) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight;

            // Custom smooth scroll with easing
            smoothScrollTo(targetPosition, 1000);
         }
      });
   });
}

// Custom smooth scroll function
function smoothScrollTo(to, duration) {
   const start = window.pageYOffset;
   const change = to - start;
   const startTime = performance.now();

   function animateScroll(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-in-out-cubic
      const ease = progress < 0.5
         ? 4 * progress * progress * progress
         : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      window.scrollTo(0, start + change * ease);

      if (progress < 1) {
         requestAnimationFrame(animateScroll);
      }
   }

   requestAnimationFrame(animateScroll);
}

/* ===================================
   Parallax Effect
   =================================== */
function initParallaxEffect() {
   const nebula = document.querySelector('.nebula');
   const stars = document.querySelectorAll('.stars');

   let mouseX = 0;
   let mouseY = 0;
   let currentX = 0;
   let currentY = 0;

   document.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX - window.innerWidth / 2) / 80;
      mouseY = (e.clientY - window.innerHeight / 2) / 80;
   });

   function animate() {
      currentX += (mouseX - currentX) * 0.03;
      currentY += (mouseY - currentY) * 0.03;

      stars.forEach((star, index) => {
         const speed = (index + 1) * 0.3;
         star.style.transform = `translate(${currentX * speed}px, ${currentY * speed}px)`;
      });

      requestAnimationFrame(animate);
   }

   animate();
}

/* ===================================
   Magnetic Button Effect
   =================================== */
function initMagneticButtons() {
   const magneticButtons = document.querySelectorAll('.magnetic-btn');

   magneticButtons.forEach(button => {
      button.addEventListener('mousemove', (e) => {
         const rect = button.getBoundingClientRect();
         const x = e.clientX - rect.left - rect.width / 2;
         const y = e.clientY - rect.top - rect.height / 2;

         button.style.setProperty('--x', `${x * 0.2}px`);
         button.style.setProperty('--y', `${y * 0.2}px`);
         button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
      });

      button.addEventListener('mouseleave', () => {
         button.style.transform = '';
      });
   });
}

/* ===================================
   Text Split Animation
   =================================== */
function initTextSplit() {
   const splitElements = document.querySelectorAll('.split-text');

   splitElements.forEach(element => {
      const text = element.textContent;
      element.innerHTML = '';

      [...text].forEach((char, i) => {
         const span = document.createElement('span');
         span.className = 'char';
         span.textContent = char === ' ' ? '\u00A0' : char;
         span.style.transitionDelay = `${i * 0.03}s`;
         element.appendChild(span);
      });
   });

   // Observe for activation
   const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
         if (entry.isIntersecting) {
            entry.target.classList.add('active');
         }
      });
   }, { threshold: 0.5 });

   splitElements.forEach(el => observer.observe(el));
}

/* ===================================
   Project Card Hover
   =================================== */
function initProjectHover() {
   const projectCards = document.querySelectorAll('.project-card');

   projectCards.forEach(card => {
      card.addEventListener('mouseenter', function () {
         // Add glow effect
         this.style.boxShadow = '0 25px 80px rgba(255,255,255,0.05)';
      });

      card.addEventListener('mouseleave', function () {
         this.style.boxShadow = '';
      });

      // Tilt effect
      card.addEventListener('mousemove', function (e) {
         const rect = this.getBoundingClientRect();
         const x = e.clientX - rect.left;
         const y = e.clientY - rect.top;
         const centerX = rect.width / 2;
         const centerY = rect.height / 2;

         const rotateX = (y - centerY) / 30;
         const rotateY = (centerX - x) / 30;

         this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
      });

      card.addEventListener('mouseleave', function () {
         this.style.transform = '';
      });
   });
}

/* ===================================
   Scroll Velocity Detection
   =================================== */
let lastScrollY = window.scrollY;
let scrollVelocity = 0;
let velocityTimeout;

window.addEventListener('scroll', () => {
   scrollVelocity = window.scrollY - lastScrollY;
   lastScrollY = window.scrollY;

   // Apply velocity-based effects
   const heroImage = document.querySelector('.hero-image-wrapper');
   if (heroImage) {
      const scale = 1 + Math.abs(scrollVelocity) * 0.0005;
      heroImage.style.transform = `scale(${Math.min(scale, 1.05)})`;

      clearTimeout(velocityTimeout);
      velocityTimeout = setTimeout(() => {
         heroImage.style.transform = '';
      }, 100);
   }
});

/* ===================================
   Intersection Observer for Performance
   =================================== */
if ('IntersectionObserver' in window) {
   // Pause iframe loading when not visible
   const iframes = document.querySelectorAll('.project-preview-iframe');

   const iframeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
         if (entry.isIntersecting) {
            const iframe = entry.target;
            if (iframe.dataset.src) {
               iframe.src = iframe.dataset.src;
            }
         }
      });
   }, { rootMargin: '200px' });

   iframes.forEach(iframe => {
      iframeObserver.observe(iframe);
   });
}

/* ===================================
   Reduce Motion for Accessibility
   =================================== */
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
   document.querySelectorAll('.stars, .nebula').forEach(el => {
      el.style.animation = 'none';
   });
}

/* ===================================
   Console Easter Egg
   =================================== */
console.log(`
%c ILA IKRAM
%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
%c Web & App Developer
 Sainthamaruthu, Sri Lanka

 ✉ mrilaikram@gmail.com
 ☏ +94 78 173 7564

 Let's build something great.
`,
   'color: #fff; font-size: 24px; font-weight: bold; font-family: monospace;',
   'color: #404040;',
   'color: #737373; font-size: 12px; font-family: monospace;'
);

/* ===================================
   Page Load Complete
   =================================== */
window.addEventListener('load', () => {
   document.body.classList.add('loaded');

   // Trigger initial animations
   setTimeout(() => {
      document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => {
         if (isElementInViewport(el)) {
            el.classList.add('active');
         }
      });
   }, 100);
});

function isElementInViewport(el) {
   const rect = el.getBoundingClientRect();
   return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
   );
}
