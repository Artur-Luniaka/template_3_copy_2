// Header and Footer Loader with tennis-themed functionality

// Load header and footer components dynamically
document.addEventListener("DOMContentLoaded", function () {
  loadHeaderComponent();
  loadFooterComponent();
});

// Load header component from external file
function loadHeaderComponent() {
  const headerContainer = document.getElementById("header-container");

  if (headerContainer) {
    fetch("header-kort.html")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load header component");
        }
        return response.text();
      })
      .then((headerContent) => {
        headerContainer.innerHTML = headerContent;

        // Re-initialize mobile menu after header is loaded
        setupMobileMenu();
      })
      .catch((error) => {
        // Fallback header content
        headerContainer.innerHTML = createFallbackHeader();
      });
  }
}

// Load footer component from external file
function loadFooterComponent() {
  const footerContainer = document.getElementById("footer-container");

  if (footerContainer) {
    fetch("footer-kort.html")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load footer component");
        }
        return response.text();
      })
      .then((footerContent) => {
        footerContainer.innerHTML = footerContent;

        // Update copyright year after footer is loaded
        updateCopyrightYear();
      })
      .catch((error) => {
        // Fallback footer content
        footerContainer.innerHTML = createFallbackFooter();
      });
  }
}

// Create fallback header content
function createFallbackHeader() {
  return `
        <header class="match-header">
            <div class="court-center">
                <div class="header-content">
                    <div class="logo-zone">
                        <a href="./" class="club-logo">
                            <span class="logo-text">Mini Tennis Club</span>
                        </a>
                    </div>
                    
                    <nav class="navigation-arena">
                        <ul class="nav-menu">
                            <li class="nav-item">
                                <a href="./" class="nav-link">Home</a>
                            </li>
                            <li class="nav-item">
                                <a href="./match-updates.html" class="nav-link">News</a>
                            </li>
                            <li class="nav-item">
                                <a href="./club-contact.html" class="nav-link">Contact</a>
                            </li>
                        </ul>
                    </nav>
                    
                    <div class="burger-zone">
                        <button class="burger-menu" id="burger-menu" aria-label="Toggle navigation menu">
                            <span class="burger-line"></span>
                            <span class="burger-line"></span>
                            <span class="burger-line"></span>
                        </button>
                    </div>
                </div>
                
                <div class="mobile-menu" id="mobile-menu">
                    <ul class="mobile-nav">
                        <li class="mobile-nav-item">
                            <a href="./" class="mobile-nav-link">Home</a>
                        </li>
                        <li class="mobile-nav-item">
                            <a href="./match-updates.html" class="mobile-nav-link">News</a>
                        </li>
                        <li class="mobile-nav-item">
                            <a href="./club-contact.html" class="mobile-nav-link">Contact</a>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    `;
}

// Create fallback footer content
function createFallbackFooter() {
  const currentYear = new Date().getFullYear();

  return `
        <footer class="footer-match-footer">
            <div class="footer-court-center">
                <div class="footer-footer-content">
                    <div class="footer-footer-section">
                        <h3 class="footer-footer-heading">Legal</h3>
                        <ul class="footer-footer-links">
                            <li class="footer-footer-link-item">
                                <a href="./tennis-cookies.html" class="footer-footer-link">Cookie Policy</a>
                            </li>
                            <li class="footer-footer-link-item">
                                <a href="./tennis-privacy.html" class="footer-footer-link">Privacy Policy</a>
                            </li>
                        </ul>
                    </div>
                    
                    <div class="footer-footer-section">
                        <h3 class="footer-footer-heading">Contact</h3>
                        <div class="footer-contact-info">
                            <p class="footer-contact-item">
                                <a href="mailto:info@progressivelabz.com" class="footer-contact-link">info@progressivelabz.com</a>
                            </p>
                            <p class="footer-contact-item">
                                <a href="tel:+19025550144" class="footer-contact-link">+1 902-555-0144</a>
                            </p>
                            <p class="footer-contact-item">
                                <span class="footer-contact-text">221B Baker Street, Paddington NSW 2021, Australia</span>
                            </p>
                        </div>
                    </div>
                </div>
                
                <div class="footer-footer-bottom">
                    <p class="footer-copyright-text">
                        &copy; ${currentYear} progressivelabz.com | All rights reserved
                    </p>
                </div>
            </div>
        </footer>
    `;
}

// Setup mobile menu functionality (re-initialized after header load)
function setupMobileMenu() {
  const burgerMenu = document.getElementById("burger-menu");
  const mobileMenu = document.getElementById("mobile-menu");

  if (burgerMenu && mobileMenu) {
    // Remove existing event listeners to prevent duplicates
    burgerMenu.removeEventListener("click", handleBurgerClick);
    burgerMenu.addEventListener("click", handleBurgerClick);

    // Close mobile menu when clicking on links
    const mobileLinks = mobileMenu.querySelectorAll(".mobile-nav-link");
    mobileLinks.forEach((link) => {
      link.removeEventListener("click", handleMobileLinkClick);
      link.addEventListener("click", handleMobileLinkClick);
    });
  }
}

// Handle burger menu click
function handleBurgerClick() {
  const burgerMenu = document.getElementById("burger-menu");
  const mobileMenu = document.getElementById("mobile-menu");

  if (burgerMenu && mobileMenu) {
    toggleMobileMenu(burgerMenu, mobileMenu);
  }
}

// Handle mobile link click
function handleMobileLinkClick() {
  const burgerMenu = document.getElementById("burger-menu");
  const mobileMenu = document.getElementById("mobile-menu");

  if (burgerMenu && mobileMenu) {
    closeMobileMenu(burgerMenu, mobileMenu);
  }
}

// Toggle mobile menu visibility
function toggleMobileMenu(burgerElement, menuElement) {
  burgerElement.classList.toggle("active");
  menuElement.classList.toggle("active");

  // Prevent body scroll when menu is open
  if (menuElement.classList.contains("active")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
}

// Close mobile menu
function closeMobileMenu(burgerElement, menuElement) {
  burgerElement.classList.remove("active");
  menuElement.classList.remove("active");
  document.body.style.overflow = "";
}

// Update copyright year dynamically
function updateCopyrightYear() {
  const yearElement = document.getElementById("current-year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// Add loading indicators
function showLoadingIndicator(containerId, message = "Loading...") {
  const container = document.getElementById(containerId);
  if (container) {
    container.innerHTML = `
            <div class="loading-indicator">
                <div class="loading-spinner"></div>
                <p>${message}</p>
            </div>
        `;
  }
}

// Remove loading indicators
function removeLoadingIndicator(containerId) {
  const container = document.getElementById(containerId);
  if (container) {
    const loadingIndicator = container.querySelector(".loading-indicator");
    if (loadingIndicator) {
      loadingIndicator.remove();
    }
  }
}

// Error handling for component loading
function handleComponentError(componentName, error) {
  // Show user-friendly error message
  const errorMessage = `Failed to load ${componentName}. Please refresh the page.`;
  showNotification(errorMessage, "error");
}

// Retry mechanism for failed component loads
function retryComponentLoad(loadFunction, maxRetries = 3) {
  let retryCount = 0;

  function attemptLoad() {
    loadFunction().catch((error) => {
      retryCount++;
      if (retryCount < maxRetries) {
        setTimeout(attemptLoad, 1000 * retryCount); // Exponential backoff
      } else {
        handleComponentError("component", error);
      }
    });
  }

  attemptLoad();
}

// Initialize component loading with retry mechanism
function initializeComponentLoading() {
  retryComponentLoad(loadHeaderComponent);
  retryComponentLoad(loadFooterComponent);
}

// Export functions for use in other scripts
window.ComponentLoader = {
  loadHeaderComponent,
  loadFooterComponent,
  setupMobileMenu,
  updateCopyrightYear,
  showLoadingIndicator,
  removeLoadingIndicator,
  handleComponentError,
  retryComponentLoad,
  initializeComponentLoading,
};
