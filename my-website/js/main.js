// main.js

// Function to navigate to a visualization page
function navigateToVisualization(page) {
    window.location.href = `pages/${page}.html`;
}

// Event listeners for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const visualizationLinks = document.querySelectorAll('.visualization-link');
    visualizationLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const page = this.getAttribute('data-page');
            navigateToVisualization(page);
        });
    });
});