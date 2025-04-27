document.getElementById('toggleBtn').addEventListener('click', async () => {
    const { darkMode } = await chrome.storage.local.get(['darkMode']);
    const newMode = !darkMode;
    
    await chrome.storage.local.set({ darkMode: newMode });
    
    // Обновляем вкладку
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: (mode) => {
        if (mode) {
          applyDarkTheme();
        } else {
          location.reload();
        }
      },
      args: [newMode]
    });
    
    updateStatus(newMode); // ← Исправлено здесь
  });
  
  function updateStatus(isActive) {
    document.getElementById('status').textContent = isActive ? 'активен' : 'неактивен';
    document.getElementById('toggleBtn').textContent = 
      isActive ? '🌞 Выключить тему' : '🌒 Включить тему';
  }
  
  // Инициализация
  chrome.storage.local.get(['darkMode'], ({ darkMode }) => {
    updateStatus(darkMode || false); // ← И здесь
  });

  document.getElementById('toggleBtn').addEventListener('click', async () => {
    const { darkMode } = await chrome.storage.local.get(['darkMode']);
    const newMode = !darkMode;
    
    await chrome.storage.local.set({ darkMode: newMode });
    
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: (mode) => {
        if (mode) {
          applyUniversalDarkTheme();
        } else {
          document.getElementById('universal-dark-theme')?.remove();
        }
      },
      args: [newMode]
    });
    
    updateUI(newMode);
  });