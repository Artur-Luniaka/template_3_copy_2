// Tennis-themed JavaScript functions and dynamics

// Global variables with tennis terminology
let scoreBoardData = [];
let matchTimer = null;
let rallyCounter = 0;
let servePower = 0;

// Initialize court dynamics when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initializeCourtDynamics();
  updateCopyrightYear();
  initializeSmoothScrolling();
});

// Initialize all court dynamics and interactions
function initializeCourtDynamics() {
  // Add intersection observer for animations
  setupIntersectionObserver();

  // Initialize form handlers - DISABLED to avoid conflicts with contact-handler.js
  // setupFormHandlers();

  // Add hover effects to cards
  addCardHoverEffects();
}

// Update copyright year dynamically
function updateCopyrightYear() {
  const yearElement = document.getElementById("current-year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// Setup smooth scrolling for anchor links
function initializeSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Setup intersection observer for scroll animations
function setupIntersectionObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
      }
    });
  }, observerOptions);

  // Observe all cards and sections
  const animatedElements = document.querySelectorAll(
    ".feature-card, .testimonial-card, .court-card, .equipment-card, .update-card, .diary-card, .contact-card"
  );
  animatedElements.forEach((element) => {
    observer.observe(element);
  });
}

// Add hover effects to cards
function addCardHoverEffects() {
  const cards = document.querySelectorAll(
    ".feature-card, .testimonial-card, .court-card, .equipment-card, .update-card, .diary-card, .contact-card"
  );

  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)";
      this.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.15)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
      this.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.1)";
    });
  });
}

// Setup form handlers
function setupFormHandlers() {
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      handleContactSubmission(this);
    });
  }
}

// Handle contact form submission
function handleContactSubmission(formElement) {
  const formData = new FormData(formElement);
  const playerName = formData.get("name");
  const playerPhone = formData.get("phone");
  const playerMessage = formData.get("message");

  // Validate form data
  if (!playerName || !playerPhone || !playerMessage) {
    showNotification("Please fill in all fields", "error");
    return;
  }

  // Simulate form submission
  showNotification(
    "Message sent successfully! We'll get back to you soon.",
    "success"
  );
  formElement.reset();
}

// Show notification messages
function showNotification(message, type) {
  // Use the new tennis-themed notification system if available
  if (window.ContactHandler && window.ContactHandler.showTennisNotification) {
    window.ContactHandler.showTennisNotification(message, type);
  } else {
    // Fallback to old notification system
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Style the notification
    notification.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          padding: 1rem 2rem;
          border-radius: 8px;
          color: white;
          font-weight: bold;
          z-index: 10000;
          transform: translateX(100%);
          transition: transform 0.3s ease;
          ${
            type === "success" ? "background: #27ae60;" : "background: #e74c3c;"
          }
      `;

    // Add to page
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = "translateX(0)";
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }
}

// Launch serve mechanic (play button functionality)
function launchServeMechanic() {
  // Add visual feedback
  const playButton = document.querySelector(".play-button");
  if (playButton) {
    playButton.style.transform = "scale(0.95)";
    setTimeout(() => {
      playButton.style.transform = "scale(1)";
    }, 150);
  }

  // Show demo message
  showNotification(
    "Demo mode activated! This would launch the game.",
    "success"
  );

  // Simulate game loading
  simulateGameLoading();
}

// Simulate game loading process
function simulateGameLoading() {
  const loadingSteps = [
    "Initializing court...",
    "Loading players...",
    "Setting up physics...",
    "Ready to serve!",
  ];

  let stepIndex = 0;

  const loadingInterval = setInterval(() => {
    if (stepIndex < loadingSteps.length) {
      showNotification(loadingSteps[stepIndex], "success");
      stepIndex++;
    } else {
      clearInterval(loadingInterval);
      showNotification("Game loaded successfully!", "success");
    }
  }, 1000);
}

// Utility function to debounce events
function debounceRally(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Utility function to throttle events
function throttleServe(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Add scroll-based animations (disabled for hero section to prevent unwanted movement)
window.addEventListener(
  "scroll",
  throttleServe(function () {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll(
      ".rally-arena:not(.hero-zone)"
    );

    parallaxElements.forEach((element) => {
      const speed = 0.5;
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  }, 16)
);

// Handle window resize events
window.addEventListener(
  "resize",
  debounceRally(function () {
    // Recalculate any dynamic layouts if needed
  }, 250)
);

// Add keyboard navigation support
document.addEventListener("keydown", function (e) {
  // Enter key on play button
  if (e.key === "Enter") {
    const playButton = document.querySelector(".play-button");
    if (document.activeElement === playButton) {
      launchServeMechanic();
    }
  }
});

// Performance monitoring
function trackPerformance() {
  if ("performance" in window) {
    window.addEventListener("load", function () {
      const loadTime =
        performance.timing.loadEventEnd - performance.timing.navigationStart;
    });
  }
}

// Initialize performance tracking
trackPerformance();
