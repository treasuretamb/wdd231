// dates.js — Dynamic copyright year and last modified

document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('copyright-year');
  const modEl  = document.getElementById('lastModified');

  if (yearEl) yearEl.textContent = new Date().getFullYear();
  if (modEl)  modEl.textContent  = `Last Modified: ${document.lastModified}`;
});
