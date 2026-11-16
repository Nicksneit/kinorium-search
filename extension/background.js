importScripts('shared.js');

// Значения по умолчанию записываются один раз — при установке/обновлении,
// и только для отсутствующих ключей (пользовательские настройки не трогаются).
chrome.runtime.onInstalled.addListener(async () => {
  const current = await chrome.storage.sync.get(null);
  const patch = {};
  for (const [key, value] of Object.entries(KS.defaults())) {
    if (current[key] === undefined) patch[key] = value;
  }
  if (Object.keys(patch).length) await chrome.storage.sync.set(patch);
});

chrome.action.onClicked.addListener(() => chrome.runtime.openOptionsPage());

chrome.runtime.onMessage.addListener((msg, sender) => {
  if (!msg || typeof msg !== 'object') return;

  if (msg.type === 'openOptions') {
    chrome.runtime.openOptionsPage();
    return;
  }

  // Несколько вкладок за раз: window.open из страницы блокируется после первой.
  if (msg.type === 'openTabs' && Array.isArray(msg.urls)) {
    const tab = sender.tab;
    msg.urls.filter(KS.isSafeUrl).slice(0, 20).forEach((url, i) => {
      const props = { url, active: false };
      if (tab) {
        props.index = tab.index + 1 + i;
        props.openerTabId = tab.id;
        props.windowId = tab.windowId;
      }
      chrome.tabs.create(props);
    });
  }
});
