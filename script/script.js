/* ============================================================
   Barbearia Inovação — JavaScript
   Modo claro/escuro + menu hambúrguer + abas + formulário de contato
   ============================================================ */

/* ---------- Referências de DOM ---------- */
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
const tabLinks = document.querySelectorAll('[data-tab]');
const tabContents = document.querySelectorAll('.tab-content');
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

/* ---------- Sistema de Abas ---------- */
function switchTab(tabName) {
  tabContents.forEach(content => content.classList.remove('active'));
  const target = document.getElementById(tabName);
  if (target) { target.classList.add('active'); }

  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.dataset.tab === tabName) { link.classList.add('active'); }
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
  nav.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
}

tabLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    switchTab(link.dataset.tab);
  });
});

/* ---------- Modo claro/escuro ---------- */
function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeIcon.textContent = '☀️';
  } else {
    document.documentElement.removeAttribute('data-theme');
    themeIcon.textContent = '🌙';
  }
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  applyTheme(savedTheme);
} else {
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(systemDark ? 'dark' : 'light');
}

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem('theme', next);
});

/* ---------- Menu hambúrguer ---------- */
hamburger.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
});

nav.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

/* ---------- Formulário de contato (envio de e-mail) ---------- */
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const assunto = document.getElementById('assunto').value;
    const mensagem = document.getElementById('mensagem').value;

    // ALTERE para o e-mail real do barbeiro
    const emailBarbeiro = 'contato@barbeariainovacao.com';

    const corpo =
      'Nome: ' + nome + '%0D%0A' +
      'E-mail: ' + email + '%0D%0A' +
      'Telefone: ' + telefone + '%0D%0A' +
      'Assunto: ' + assunto + '%0D%0A%0D%0A' +
      'Mensagem:%0D%0A' + mensagem;

    const mailtoLink = 'mailto:' + emailBarbeiro +
      '?subject=' + encodeURIComponent(assunto + ' — ' + nome) +
      '&body=' + corpo;

    window.location.href = mailtoLink;

    formMessage.textContent = 'Abrindo seu cliente de e-mail... Caso não abra, escreva para ' + emailBarbeiro;
    formMessage.className = 'form-message success';
    contactForm.reset();
  });
}