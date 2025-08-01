// Contact Form Handler with tennis-themed functionality

// Initialize contact form when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initializeContactForm();
});

// Initialize contact form functionality
function initializeContactForm() {
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    // Add form submission handler
    contactForm.addEventListener("submit", handleContactFormSubmission);
  }
}

// Handle contact form submission
function handleContactFormSubmission(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const playerName = formData.get("name").trim();
  const playerPhone = formData.get("phone").trim();
  const playerMessage = formData.get("message").trim();

  // Show countdown overlay
  showCountdownOverlay();

  // Simulate form submission with countdown
  simulateFormSubmissionWithCountdown(playerName, playerPhone, playerMessage)
    .then(() => {
      hideCountdownOverlay();
      // Wait for overlay to disappear, then immediately scroll and show notification
      setTimeout(() => {
        // Scroll to top
        window.scrollTo({ top: 0, behavior: "smooth" });
        // Show notification immediately
        showFormSuccess();
        resetContactForm(event.target);
      }, 600); // Wait for overlay fade out (500ms) + small delay
    })
    .catch((error) => {
      hideCountdownOverlay();
      showFormError("Failed to send message. Please try again.");
    });
}

// Show countdown overlay
function showCountdownOverlay() {
  // Create overlay
  const overlay = document.createElement("div");
  overlay.id = "countdown-overlay";
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(45, 90, 39, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
    backdrop-filter: blur(5px);
  `;

  // Create countdown container
  const countdownContainer = document.createElement("div");
  countdownContainer.style.cssText = `
    text-align: center;
    color: white;
  `;

  // Create countdown number
  const countdownNumber = document.createElement("div");
  countdownNumber.id = "countdown-number";
  countdownNumber.style.cssText = `
    font-size: 8rem;
    font-weight: bold;
    color: #f1c40f;
    text-shadow: 0 0 20px rgba(241, 196, 15, 0.5);
    margin-bottom: 1rem;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  `;

  // Create loading text
  const loadingText = document.createElement("div");
  loadingText.textContent = "Sending your message...";
  loadingText.style.cssText = `
    font-size: 1.5rem;
    color: white;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  `;

  countdownContainer.appendChild(countdownNumber);
  countdownContainer.appendChild(loadingText);
  overlay.appendChild(countdownContainer);
  document.body.appendChild(overlay);

  // Start countdown
  let count = 3;
  countdownNumber.textContent = count;

  const countdownInterval = setInterval(() => {
    count--;
    if (count > 0) {
      countdownNumber.textContent = count;
    } else {
      clearInterval(countdownInterval);
      countdownNumber.textContent = "✓";
      countdownNumber.style.color = "#27ae60";
    }
  }, 1000);
}

// Hide countdown overlay
function hideCountdownOverlay() {
  const overlay = document.getElementById("countdown-overlay");
  if (overlay) {
    overlay.style.opacity = "0";
    overlay.style.transition = "opacity 0.5s ease";
    setTimeout(() => {
      if (overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
    }, 500);
  }
}

// Simulate form submission with countdown - always succeeds
function simulateFormSubmissionWithCountdown(name, phone, message) {
  return new Promise((resolve) => {
    // Wait for countdown to complete (3 seconds) plus some processing time
    setTimeout(() => {
      resolve(); // Always resolve - form always sends successfully
    }, 3000); // Exactly 3 seconds to match countdown duration
  });
}

// Show tennis-themed notification
function showTennisNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll(
    ".tennis-notification"
  );
  existingNotifications.forEach((notification) => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  });

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `tennis-notification tennis-notification-${type}`;

  // Set notification styles based on type
  let backgroundColor, borderColor, textColor, icon;

  switch (type) {
    case "success":
      backgroundColor = "#d4edda";
      borderColor = "#c3e6cb";
      textColor = "#155724";
      icon = "🎾";
      break;
    case "error":
      backgroundColor = "#f8d7da";
      borderColor = "#f5c6cb";
      textColor = "#721c24";
      icon = "❌";
      break;
    case "warning":
      backgroundColor = "#fff3cd";
      borderColor = "#ffeaa7";
      textColor = "#856404";
      icon = "⚠️";
      break;
    default:
      backgroundColor = "#d1ecf1";
      borderColor = "#bee5eb";
      textColor = "#0c5460";
      icon = "ℹ️";
  }

  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${backgroundColor};
    border: 2px solid ${borderColor};
    color: ${textColor};
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 10001;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1rem;
    font-weight: 500;
    max-width: 400px;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  `;

  // Create icon element
  const iconElement = document.createElement("span");
  iconElement.textContent = icon;
  iconElement.style.fontSize = "1.5rem";

  // Create message element
  const messageElement = document.createElement("span");
  messageElement.textContent = message;

  notification.appendChild(iconElement);
  notification.appendChild(messageElement);
  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Auto-remove after 5 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 5000);
}

// Show form error message
function showFormError(message) {
  showTennisNotification(message, "error");
}

// Show form success message
function showFormSuccess() {
  showTennisNotification(
    "Message sent successfully! We'll get back to you soon.",
    "success"
  );
}

// Reset contact form
function resetContactForm(form) {
  form.reset();
}

// Export functions for use in other scripts
window.ContactHandler = {
  initializeContactForm,
  showTennisNotification,
  showFormError,
  showFormSuccess,
  resetContactForm,
};
