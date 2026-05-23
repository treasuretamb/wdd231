// directory.js — Fetch members.json, render grid/list, toggle view

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('members-container');
  const btnGrid   = document.getElementById('btn-grid');
  const btnList   = document.getElementById('btn-list');
  const countEl   = document.getElementById('member-count');

  let allMembers  = [];
  let currentView = 'grid';

  //  Helpers 

  function badgeHTML(level) {
    const map = {
      3: ['badge-gold',   '★ Gold'],
      2: ['badge-silver', '◆ Silver'],
      1: ['badge-member', '● Member'],
    };
    const [cls, label] = map[level] || map[1];
    return `<span class="badge ${cls}">${label}</span>`;
  }

  const PIN_SVG = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>`;
  const TEL_SVG = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.2 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"/></svg>`;

  //  Render Grid 

  function renderGrid(members) {
    container.className = 'grid-view';
    container.innerHTML = members.map(m => `
      <article class="member-card">
        <div class="card-top" aria-hidden="true">
          <span class="card-initial">${m.name.charAt(0)}</span>
        </div>
        <div class="card-body">
          <div class="card-title-row">
            <h2 class="card-name">${m.name}</h2>
            ${badgeHTML(m.membershipLevel)}
          </div>
          <p class="card-desc">${m.description}</p>
          <p class="card-detail">${PIN_SVG}<span>${m.address}</span></p>
          <p class="card-detail">${TEL_SVG}<a href="tel:${m.phone.replace(/\s/g, '')}">${m.phone}</a></p>
          <a href="${m.website}" target="_blank" rel="noopener noreferrer" class="card-link">Visit Website ↗</a>
        </div>
      </article>
    `).join('');
  }

  //  Render List 

  function renderList(members) {
    container.className = 'list-view';
    container.innerHTML = members.map((m, i) => `
      <div class="list-row">
        <span class="list-num">${i + 1}</span>
        <span class="list-name">${m.name}</span>
        <span class="list-phone">${m.phone}</span>
        <span>${badgeHTML(m.membershipLevel)}</span>
      </div>
    `).join('');
  }

  //  Dispatch render 

  function render(members) {
    if (currentView === 'grid') renderGrid(members);
    else renderList(members);
    if (countEl) countEl.textContent = `${members.length} member${members.length !== 1 ? 's' : ''}`;
  }

  //  View toggle 

  btnGrid?.addEventListener('click', () => {
    currentView = 'grid';
    btnGrid.classList.add('active');
    btnList.classList.remove('active');
    render(allMembers);
  });

  btnList?.addEventListener('click', () => {
    currentView = 'list';
    btnList.classList.add('active');
    btnGrid.classList.remove('active');
    render(allMembers);
  });

  //  Fetch 

  async function fetchMembers() {
    container.innerHTML = `
      <div class="loading-state">
        <div class="spinner"></div>
        <p>Loading members…</p>
      </div>`;

    try {
      const response = await fetch('data/members.json');
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      const data = await response.json();
      allMembers = data.members;
      render(allMembers);
    } catch (err) {
      container.innerHTML = `
        <div class="error-state">
          <p><strong>Could not load member data.</strong></p>
          <p>${err.message} — please try refreshing.</p>
        </div>`;
      console.error('fetchMembers error:', err);
    }
  }

  fetchMembers();
});
