// Content Loader for JSON data with tennis-themed functionality

// Global content cache
let contentCache = new Map();
let loadingPromises = new Map();

// Initialize content loading when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  loadAllPageContent();
});

// Load all content for the current page
function loadAllPageContent() {
  const currentPage = getCurrentPageName();

  switch (currentPage) {
    case "index":
      loadHomePageContent();
      break;
    case "match-updates":
      loadNewsPageContent();
      break;
    case "club-contact":
      loadContactPageContent();
      break;
    default:
    // No specific content loading required for this page
  }
}

// Get current page name from URL
function getCurrentPageName() {
  const path = window.location.pathname;
  const filename = path.split("/").pop().replace(".html", "");
  return filename || "index";
}

// Load content for homepage
function loadHomePageContent() {
  const contentPromises = [
    loadFeaturesContent(),
    loadRulesContent(),
    loadTestimonialsContent(),
    loadCourtsContent(),
    loadEquipmentContent(),
  ];

  Promise.all(contentPromises)
    .then(() => {
      // All homepage content loaded successfully
    })
    .catch((error) => {
      // Error loading homepage content
    });
}

// Load content for news page
function loadNewsPageContent() {
  const contentPromises = [loadUpdatesContent(), loadDiariesContent()];

  Promise.all(contentPromises)
    .then(() => {
      // All news page content loaded successfully
    })
    .catch((error) => {
      // Error loading news page content
    });
}

// Load content for contact page
function loadContactPageContent() {
  loadContactInfoContent()
    .then(() => {
      // Contact page content loaded successfully
    })
    .catch((error) => {
      // Error loading contact page content
    });
}

// Load features content
function loadFeaturesContent() {
  return loadJSONContent(
    "data/features.json",
    "features-container",
    renderFeaturesContent
  );
}

// Load rules content
function loadRulesContent() {
  return loadJSONContent(
    "data/rules.json",
    "rules-container",
    renderRulesContent
  );
}

// Load testimonials content
function loadTestimonialsContent() {
  return loadJSONContent(
    "data/testimonials.json",
    "testimonials-container",
    renderTestimonialsContent
  );
}

// Load courts content
function loadCourtsContent() {
  return loadJSONContent(
    "data/courts.json",
    "courts-container",
    renderCourtsContent
  );
}

// Load equipment content
function loadEquipmentContent() {
  return loadJSONContent(
    "data/equipment.json",
    "equipment-container",
    renderEquipmentContent
  );
}

// Load updates content
function loadUpdatesContent() {
  return loadJSONContent(
    "data/updates.json",
    "updates-container",
    renderUpdatesContent
  );
}

// Load diaries content
function loadDiariesContent() {
  return loadJSONContent(
    "data/diaries.json",
    "diaries-container",
    renderDiariesContent
  );
}

// Load contact info content
function loadContactInfoContent() {
  return loadJSONContent(
    "data/contact.json",
    "contact-container",
    renderContactContent
  );
}

// Generic JSON content loader with caching
function loadJSONContent(jsonPath, containerId, renderFunction) {
  // Check cache first
  if (contentCache.has(jsonPath)) {
    const cachedData = contentCache.get(jsonPath);
    renderFunction(cachedData, containerId);
    return Promise.resolve(cachedData);
  }

  // Check if already loading
  if (loadingPromises.has(jsonPath)) {
    return loadingPromises.get(jsonPath);
  }

  // Show loading indicator
  showLoadingIndicator(containerId, "Loading content...");

  // Create loading promise
  const loadingPromise = fetch(jsonPath)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load ${jsonPath}: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Cache the data
      contentCache.set(jsonPath, data);

      // Remove loading indicator
      removeLoadingIndicator(containerId);

      // Render the content
      renderFunction(data, containerId);

      return data;
    })
    .catch((error) => {
      // Remove loading indicator
      removeLoadingIndicator(containerId);

      // Show fallback content
      showFallbackContent(containerId, jsonPath);

      throw error;
    })
    .finally(() => {
      // Remove from loading promises
      loadingPromises.delete(jsonPath);
    });

  // Store loading promise
  loadingPromises.set(jsonPath, loadingPromise);

  return loadingPromise;
}

// Render features content
function renderFeaturesContent(data, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const featuresHTML = data.features
    .map(
      (feature) => `
        <div class="feature-card">
            <div class="feature-icon">${feature.icon}</div>
            <h3 class="feature-title">${feature.title}</h3>
            <p class="feature-description">${feature.description}</p>
        </div>
    `
    )
    .join("");

  container.innerHTML = featuresHTML;
}

// Render rules content
function renderRulesContent(data, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const rulesHTML = `
            <div class="rules-section">
                <h3>Controls</h3>
                <ul>
                    ${data.controls
                      .map((control) => `<li>${control}</li>`)
                      .join("")}
                </ul>
            </div>
            <div class="rules-section">
                <h3>Game Rules</h3>
                <ul>
                    ${data.rules.map((rule) => `<li>${rule}</li>`).join("")}
                </ul>
            </div>
    `;

  container.innerHTML = rulesHTML;
}

// Render testimonials content
function renderTestimonialsContent(data, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Take only first 4 testimonials
  const limitedTestimonials = data.testimonials.slice(0, 4);

  const testimonialsHTML = limitedTestimonials
    .map(
      (testimonial) => `
        <div class="testimonial-card">
            <div class="testimonial-content">
                <p class="testimonial-text">${testimonial.comment}</p>
            </div>
            <div class="testimonial-author">
                <h4 class="author-name">${testimonial.name}</h4>
                <p class="author-title">${testimonial.title}</p>
            </div>
        </div>
    `
    )
    .join("");

  container.innerHTML = testimonialsHTML;
}

// Render courts content
function renderCourtsContent(data, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const courtsHTML = data.courts
    .map(
      (court) => `
        <div class="court-card">
            <h3 class="court-title">${court.name}</h3>
            <p class="court-description">${court.description}</p>
            <div class="court-features">
                <h4>Features:</h4>
                <ul>
                    ${court.features
                      .map((feature) => `<li>${feature}</li>`)
                      .join("")}
                </ul>
            </div>
        </div>
    `
    )
    .join("");

  container.innerHTML = courtsHTML;
}

// Render equipment content
function renderEquipmentContent(data, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const equipmentHTML = data.equipment
    .map(
      (item) => `
        <div class="equipment-card">
            <h3 class="equipment-title">${item.name}</h3>
            <p class="equipment-description">${item.description}</p>
            <div class="equipment-stats">
                <div class="stat">
                    <span class="stat-label">Power:</span>
                    <span class="stat-value">${item.power}</span>
                </div>
                <div class="stat">
                    <span class="stat-label">Control:</span>
                    <span class="stat-value">${item.control}</span>
                </div>
                <div class="stat">
                    <span class="stat-label">Speed:</span>
                    <span class="stat-value">${item.speed}</span>
                </div>
            </div>
        </div>
    `
    )
    .join("");

  container.innerHTML = equipmentHTML;
}

// Render updates content
function renderUpdatesContent(data, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const updatesHTML = data.updates
    .map(
      (update) => `
        <div class="update-card">
            <div class="update-header">
                <h3 class="update-title">${update.title}</h3>
                <span class="update-date">${update.date}</span>
            </div>
            <p class="update-description">${update.description}</p>
            <div class="update-details">
                <h4>Changes:</h4>
                <ul>
                    ${update.changes
                      .map((change) => `<li>${change}</li>`)
                      .join("")}
                </ul>
            </div>
        </div>
    `
    )
    .join("");

  container.innerHTML = updatesHTML;
}

// Render diaries content
function renderDiariesContent(data, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const diariesHTML = data.diaries
    .map(
      (diary) => `
        <div class="diary-card">
            <div class="diary-header">
                <h3 class="diary-title">${diary.title}</h3>
                <span class="diary-date">${diary.date}</span>
            </div>
            <p class="diary-content">${diary.content}</p>
            <div class="diary-author">
                <span class="author-name">By ${diary.author}</span>
            </div>
        </div>
    `
    )
    .join("");

  container.innerHTML = diariesHTML;
}

// Render contact content
function renderContactContent(data, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const contactHTML = `
        <div class="contact-item">
            <div class="contact-icon">📧</div>
            <div class="contact-content">
                <div class="contact-label">Email</div>
                <div class="contact-value">
                    <a href="mailto:${data.email}">${data.email}</a>
                </div>
            </div>
        </div>
        <div class="contact-item">
            <div class="contact-icon">📞</div>
            <div class="contact-content">
                <div class="contact-label">Phone</div>
                <div class="contact-value">
                    <a href="tel:${data.phone}">${data.phone}</a>
                </div>
            </div>
        </div>
        <div class="contact-item">
            <div class="contact-icon">📍</div>
            <div class="contact-content">
                <div class="contact-label">Address</div>
                <div class="contact-value">${data.address}</div>
            </div>
        </div>
    `;

  container.innerHTML = contactHTML;
}

// Show loading indicator
function showLoadingIndicator(containerId, message) {
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

// Remove loading indicator
function removeLoadingIndicator(containerId) {
  const container = document.getElementById(containerId);
  if (container) {
    const loadingIndicator = container.querySelector(".loading-indicator");
    if (loadingIndicator) {
      loadingIndicator.remove();
    }
  }
}

// Show fallback content when JSON loading fails
function showFallbackContent(containerId, jsonPath) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const fallbackContent = getFallbackContent(containerId, jsonPath);
  container.innerHTML = fallbackContent;
}

// Get fallback content based on container type
function getFallbackContent(containerId, jsonPath) {
  const containerType = containerId.replace("-container", "");

  switch (containerType) {
    case "features":
      return `
                <div class="feature-card">
                    <h3>Fast Matches</h3>
                    <p>Quick and exciting tennis matches for players of all skill levels.</p>
                </div>
                <div class="feature-card">
                    <h3>Realistic Physics</h3>
                    <p>Advanced ball physics and realistic court dynamics.</p>
                </div>
                <div class="feature-card">
                    <h3>Dynamic Players</h3>
                    <p>AI-powered players with unique personalities and playing styles.</p>
                </div>
            `;
    case "testimonials":
      return `
                <div class="testimonial-card">
                    <p>"Amazing game! The physics are incredibly realistic."</p>
                    <h4>John Smith</h4>
                    <p>Tennis Enthusiast</p>
                </div>
            `;
    case "courts":
      return `
                <div class="court-card">
                    <h3>Grass Court</h3>
                    <p>Traditional Wimbledon-style grass court with fast gameplay.</p>
                </div>
            `;
    case "equipment":
      return `
                <div class="equipment-card">
                    <h3>Pro Racket</h3>
                    <p>Professional-grade tennis racket with excellent control.</p>
                </div>
            `;
    case "updates":
      return `
                <div class="update-card">
                    <h3>Latest Update</h3>
                    <p>New features and improvements have been added to the game.</p>
                </div>
            `;
    case "diaries":
      return `
                <div class="diary-card">
                    <h3>Player Story</h3>
                    <p>Read about amazing achievements and memorable matches.</p>
                </div>
            `;
    case "contact":
      return `
                <div class="contact-item">
                    <div class="contact-icon">📧</div>
                    <div class="contact-content">
                        <div class="contact-label">Email</div>
                        <div class="contact-value">
                            <a href="mailto:info@progressivelabz.com">info@progressivelabz.com</a>
                        </div>
                    </div>
                </div>
                <div class="contact-item">
                    <div class="contact-icon">📞</div>
                    <div class="contact-content">
                        <div class="contact-label">Phone</div>
                        <div class="contact-value">
                            <a href="tel:+19025550144">+1 902-555-0144</a>
                        </div>
                    </div>
                </div>
                <div class="contact-item">
                    <div class="contact-icon">📍</div>
                    <div class="contact-content">
                        <div class="contact-label">Address</div>
                        <div class="contact-value">221B Baker Street, Paddington NSW 2021, Australia</div>
                    </div>
                </div>
            `;
    default:
      return "<p>Content loading failed. Please refresh the page.</p>";
  }
}

// Clear content cache
function clearContentCache() {
  contentCache.clear();
}

// Reload specific content
function reloadContent(jsonPath, containerId, renderFunction) {
  contentCache.delete(jsonPath);
  return loadJSONContent(jsonPath, containerId, renderFunction);
}

// Export functions for use in other scripts
window.ContentLoader = {
  loadAllPageContent,
  loadJSONContent,
  clearContentCache,
  reloadContent,
  getCurrentPageName,
};
