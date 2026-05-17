document.addEventListener('DOMContentLoaded', function() {
    // Current Year
    const currentYear = new Date().getFullYear();
    document.getElementById('currentyear').textContent = currentYear;

    // Last Modified
    const lastModified = document.lastModified;
    const lastModifiedEl = document.getElementById('lastmodified');
    if (lastModifiedEl) {
        lastModifiedEl.textContent = lastModified;
    }
});