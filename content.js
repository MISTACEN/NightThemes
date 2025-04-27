const DARK_THEME_CONFIG = {
    // Основные цвета
    background: '#1a1a1a',
    text: '#e0e0e0',
    accent: '#4a90e2',
    
    // Специальные настройки для Википедии
    wikipedia: {
      background: '#121212',
      menuBackground: '#1f1f1f',
      buttonBackground: '#2d4a6e',
      borderColor: '#3a3a3a'
    }
  };
  
  function createGlobalStyles() {
    const style = document.createElement('style');
    style.id = 'global-dark-theme';
    style.textContent = `
      :root {
        --background-base: ${DARK_THEME_CONFIG.background};
        --text-color: ${DARK_THEME_CONFIG.text};
        --accent-color: ${DARK_THEME_CONFIG.accent};
        --border-color: #3a3a3a;
      }
  
      body {
        background: var(--background-base) !important;
        color: var(--text-color) !important;
      }
  
      *:not(img):not(video):not(iframe) {
        background-color: var(--background-base) !important;
        color: var(--text-color) !important;
        border-color: var(--border-color) !important;
      }
  
      a, button, [role="button"] {
        color: var(--accent-color) !important;
      }
    `;
    return style;
  }
  
  function applyWikipediaStyles() {
    const style = document.createElement('style');
    style.id = 'wikipedia-dark';
    style.textContent = `
      /* Основные элементы */
      .vector-header-container,
      .vector-sidebar,
      .mw-table-of-contents-container {
        background: ${DARK_THEME_CONFIG.wikipedia.background} !important;
      }
  
      /* Кнопки и элементы управления */
      .mw-ui-button,
      .cdx-button,
      .vector-search-box-input {
        background: ${DARK_THEME_CONFIG.wikipedia.buttonBackground} !important;
        border: 1px solid ${DARK_THEME_CONFIG.wikipedia.borderColor} !important;
        color: ${DARK_THEME_CONFIG.text} !important;
      }
  
      /* Выпадающие меню */
      .vector-dropdown-content {
        background: ${DARK_THEME_CONFIG.wikipedia.menuBackground} !important;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3) !important;
      }
  
      /* Инфобоксы и боковые панели */
      .infobox, .navbox {
        background: ${DARK_THEME_CONFIG.background} !important;
        border-color: ${DARK_THEME_CONFIG.wikipedia.borderColor} !important;
      }
  
      /* Иконки */
      .mw-ui-icon {
        filter: invert(0.85) brightness(1.2);
      }
    `;
    return style;
  }
  
  function applyDarkTheme() {
    const elements = document.querySelectorAll('*');
    
    // Удаляем предыдущие стили
    document.getElementById('global-dark-theme')?.remove();
    document.getElementById('wikipedia-dark')?.remove();
  
    // Применяем глобальные стили
    document.head.appendChild(createGlobalStyles());
  
    // Специальные стили для Википедии
    if (window.location.host.includes('wikipedia.org')) {
      document.head.appendChild(applyWikipediaStyles());
    }
  
    // Инвертируем медиа-контент
    document.querySelectorAll('img, video').forEach(media => {
      media.style.filter = 'brightness(0.8) contrast(1.2)';
    });
  }
  
  // Обработчик переключения темы
  chrome.storage.onChanged.addListener(({ darkMode }) => {
    if (darkMode?.newValue) {
      applyDarkTheme();
    } else {
      document.getElementById('global-dark-theme')?.remove();
      document.getElementById('wikipedia-dark')?.remove();
      document.querySelectorAll('img, video').forEach(media => {
        media.style.filter = '';
      });
    }
  });
  
  // Инициализация
  chrome.storage.local.get(['darkMode'], ({ darkMode }) => {
    if (darkMode) applyDarkTheme();
  });