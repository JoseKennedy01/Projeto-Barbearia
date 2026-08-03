/**
 * Barbearia Inovação — script.js
 * JavaScript modular, sem dependências externas.
 * Módulos:
 *   1. Header (estado de scroll)
 *   2. Menu mobile
 *   3. Scroll reveal (IntersectionObserver)
 *   4. Accordion do FAQ
 *   5. Rodapé (ano dinâmico)
 *   6. Fechamento de menu ao clicar em link
 */
(function () {
  'use strict';

  /* ------------------------------------------------------------------ */
  /* 1. HEADER — alterna aparência ao rolar a página                    */
  /* ------------------------------------------------------------------ */
  const Header = (function () {
    const header = document.getElementById('header');
    if (!header) return null;

    const SCROLL_THRESHOLD = 12;
    let ticking = false;

    function update() {
      header.classList.toggle('is-scrolled', window.scrollY > SCROLL_THRESHOLD);
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }

    function init() {
      update();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    return { init };
  })();

  /* ------------------------------------------------------------------ */
  /* 2. MENU MOBILE — hambúrguer com acessibilidade (aria-expanded)     */
  /* ------------------------------------------------------------------ */
  const MobileMenu = (function () {
    const toggle = document.getElementById('menuToggle');
    const menu = document.getElementById('mobileMenu');
    if (!toggle || !menu) return null;

    function open() {
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Fechar menu');
      menu.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }

    function close() {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menu');
      menu.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    function isOpen() {
      return toggle.getAttribute('aria-expanded') === 'true';
    }

    function init() {
      toggle.addEventListener('click', function () {
        isOpen() ? close() : open();
      });

      // Fecha ao clicar em qualquer link do menu
      menu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', close);
      });

      // Fecha com a tecla Esc
      document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && isOpen()) {
          close();
          toggle.focus();
        }
      });
    }

    return { init, close };
  })();

  /* ------------------------------------------------------------------ */
  /* 3. SCROLL REVEAL — revela elementos [data-reveal] ao entrar em tela */
  /* ------------------------------------------------------------------ */
  const ScrollReveal = (function () {
    const targets = document.querySelectorAll('[data-reveal], .divider');

    function init() {
      if (!targets.length) return;

      // Sem suporte a IntersectionObserver: revela tudo de imediato
      if (!('IntersectionObserver' in window)) {
        targets.forEach(function (el) {
          el.classList.add('is-visible');
        });
        return;
      }

      const observer = new IntersectionObserver(
        function (entries, obs) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
      );

      targets.forEach(function (el) {
        observer.observe(el);
      });
    }

    return { init };
  })();

  /* ------------------------------------------------------------------ */
  /* 4. ACCORDION — perguntas frequentes com animação suave de altura   */
  /* ------------------------------------------------------------------ */
  const Accordion = (function () {
    const items = document.querySelectorAll('.accordion__item');
    if (!items.length) return null;

    function setPanelHeight(panel, expanded) {
      if (expanded) {
        panel.style.maxHeight = panel.scrollHeight + 'px';
      } else {
        panel.style.maxHeight = '0px';
      }
    }

    function toggleItem(trigger, panel, expand) {
      trigger.setAttribute('aria-expanded', String(expand));
      setPanelHeight(panel, expand);
    }

    function init() {
      items.forEach(function (item) {
        const trigger = item.querySelector('.accordion__trigger');
        const panel = item.querySelector('.accordion__panel');
        if (!trigger || !panel) return;

        const startsOpen = trigger.getAttribute('aria-expanded') === 'true';
        setPanelHeight(panel, startsOpen);

        trigger.addEventListener('click', function () {
          const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

          // Fecha os demais itens (comportamento de accordion único)
          items.forEach(function (other) {
            if (other === item) return;
            const otherTrigger = other.querySelector('.accordion__trigger');
            const otherPanel = other.querySelector('.accordion__panel');
            if (otherTrigger && otherPanel) {
              toggleItem(otherTrigger, otherPanel, false);
            }
          });

          toggleItem(trigger, panel, !isExpanded);
        });
      });

      // Recalcula alturas abertas ao redimensionar a janela
      let resizeTimer;
      window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
          items.forEach(function (item) {
            const trigger = item.querySelector('.accordion__trigger');
            const panel = item.querySelector('.accordion__panel');
            if (trigger && panel && trigger.getAttribute('aria-expanded') === 'true') {
              panel.style.maxHeight = panel.scrollHeight + 'px';
            }
          });
        }, 150);
      });
    }

    return { init };
  })();

  /* ------------------------------------------------------------------ */
  /* 5. RODAPÉ — ano corrente automático no copyright                   */
  /* ------------------------------------------------------------------ */
  const Footer = (function () {
    function init() {
      const yearEl = document.getElementById('year');
      if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
      }
    }
    return { init };
  })();

  /* ------------------------------------------------------------------ */
  /* INIT — inicializa todos os módulos quando o DOM estiver pronto     */
  /* ------------------------------------------------------------------ */
  document.addEventListener('DOMContentLoaded', function () {
    Header && Header.init();
    MobileMenu && MobileMenu.init();
    ScrollReveal && ScrollReveal.init();
    Accordion && Accordion.init();
    Footer && Footer.init();
  });
})();