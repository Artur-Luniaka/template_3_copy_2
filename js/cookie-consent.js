// Cookie Consent Management
document.addEventListener("DOMContentLoaded", function () {
  const cookieBar = document.getElementById("cookie-consent-bar");
  const acceptButton = document.getElementById("accept-cookies");

  // Check if user has already accepted cookies
  const cookiesAccepted = localStorage.getItem("cookiesAccepted");

  if (!cookiesAccepted && cookieBar) {
    // Show cookie bar after a short delay
    setTimeout(() => {
      cookieBar.classList.add("show");
    }, 1000);
  }

  // Handle accept button click
  if (acceptButton) {
    acceptButton.addEventListener("click", function () {
      // Save consent to localStorage
      localStorage.setItem("cookiesAccepted", "true");

      // Hide cookie bar with animation
      cookieBar.classList.remove("show");

      // Remove cookie bar from DOM after animation
      setTimeout(() => {
        if (cookieBar && cookieBar.parentNode) {
          cookieBar.parentNode.removeChild(cookieBar);
        }
      }, 500);
    });
  }
});

// Function to check if cookies are accepted (for other scripts)
function areCookiesAccepted() {
  return localStorage.getItem("cookiesAccepted") === "true";
}

// Function to clear cookie consent (for testing)
function clearCookieConsent() {
  localStorage.removeItem("cookiesAccepted");
}

// Export functions for use in other scripts
window.CookieConsent = {
  areCookiesAccepted,
  clearCookieConsent,
};
