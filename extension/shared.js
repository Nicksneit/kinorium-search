// Общий код для content script, страницы настроек и service worker.
(() => {
  'use strict';
  const root = typeof globalThis !== 'undefined' ? globalThis : self;
  if (root.KS) return;

  const LANGS = ['ru', 'uk', 'en'];
  const THEMES = ['dark', 'light', 'gray', 'auto'];

  function detectLang() {
    try {
      const ui = (chrome.i18n.getUILanguage() || '').toLowerCase();
      if (ui.startsWith('uk')) return 'uk';
      if (ui.startsWith('ru')) return 'ru';
    } catch (_) { /* нет i18n API */ }
    return 'en';
  }

  const PRESETS = [
    { name: 'IMDb', url: 'https://www.imdb.com/find/?q={title}' },
    { name: 'Letterboxd', url: 'https://letterboxd.com/search/films/{title}/' },
    { name: 'TMDB', url: 'https://www.themoviedb.org/search?query={title}' },
    { name: 'Rotten Tomatoes', url: 'https://www.rottentomatoes.com/search?search={title}' },
    { name: 'Metacritic', url: 'https://www.metacritic.com/search/{title}/' },
    { name: 'Trakt', url: 'https://trakt.tv/search?query={title}' },
    { name: 'MyAnimeList', url: 'https://myanimelist.net/search/all?q={title}' },
    { name: 'Wikipedia', url: 'https://en.wikipedia.org/w/index.php?search={title}' },
    { name: 'YouTube', url: 'https://www.youtube.com/results?search_query={title}+trailer' },
    { name: 'Google', url: 'https://www.google.com/search?q={title}' }
  ];

  function defaults() {
    return {
      sites: [PRESETS[0], PRESETS[1]].map(s => ({ ...s })),
      buttonText: '🔍',
      buttonTheme: 'dark',
      interfaceLang: detectLang(),
      showIcons: true,
      showOpenAll: true
    };
  }

  function isSafeUrl(url) {
    return typeof url === 'string' && /^https?:\/\/[^\s/]+/i.test(url.trim());
  }

  function isValidTemplate(url) {
    return isSafeUrl(url) && url.includes('{title}');
  }

  // {title} — поисковый запрос (при withYear к нему через пробел добавляется год).
  function buildUrl(template, title, year, withYear) {
    const query = withYear && year ? `${title} ${year}` : title;
    return template.split('{title}').join(encodeURIComponent(query));
  }

  function cleanSite(s) {
    if (!s || typeof s !== 'object') return null;
    const name = String(s.name ?? '').trim().slice(0, 60);
    const url = String(s.url ?? '').trim().slice(0, 500);
    return name && isValidTemplate(url) ? { name, url } : null;
  }

  // Проверка импортируемых/сохраняемых настроек: только известные ключи и корректные значения.
  function sanitizeSettings(raw) {
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) throw new Error('bad format');
    const out = {};
    if (Array.isArray(raw.sites)) out.sites = raw.sites.map(cleanSite).filter(Boolean).slice(0, 50);
    if (typeof raw.buttonText === 'string') out.buttonText = raw.buttonText.trim().slice(0, 12) || '🔍';
    if (THEMES.includes(raw.buttonTheme)) out.buttonTheme = raw.buttonTheme;
    if (LANGS.includes(raw.interfaceLang)) out.interfaceLang = raw.interfaceLang;
    if (typeof raw.showIcons === 'boolean') out.showIcons = raw.showIcons;
    if (typeof raw.showOpenAll === 'boolean') out.showOpenAll = raw.showOpenAll;
    if (!Object.keys(out).length) throw new Error('no settings');
    return out;
  }

  function resolveTheme(theme) {
    if (theme !== 'auto') return THEMES.includes(theme) ? theme : 'dark';
    try {
      return matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    } catch (_) {
      return 'dark';
    }
  }

  // Строки для выпадающего меню на страницах Кинориума
  const STRINGS = {
    ru: {
      btnTitle: 'Поиск фильма', noSites: 'Нет добавленных сайтов', openSettings: 'Открыть настройки',
      settings: 'Настройки', openAll: 'Открыть все', copy: 'Копировать', copied: 'Скопировано',
      byOriginal: 'По оригинальному названию', byOriginalYear: 'По оригинальному названию и году',
      search: 'Искать', openSelected: 'Открыть', pick: 'Отметить для «Открыть все»'
    },
    uk: {
      btnTitle: 'Пошук фільму', noSites: 'Немає доданих сайтів', openSettings: 'Відкрити налаштування',
      settings: 'Налаштування', openAll: 'Відкрити всі', copy: 'Копіювати', copied: 'Скопійовано',
      byOriginal: 'За оригінальною назвою', byOriginalYear: 'За оригінальною назвою та роком',
      search: 'Шукати', openSelected: 'Відкрити', pick: 'Позначити для «Відкрити всі»'
    },
    en: {
      btnTitle: 'Search movie', noSites: 'No sites added', openSettings: 'Open settings',
      settings: 'Settings', openAll: 'Open all', copy: 'Copy', copied: 'Copied',
      byOriginal: 'By original title', byOriginalYear: 'By original title and year',
      search: 'Search', openSelected: 'Open', pick: 'Select for “Open all”'
    }
  };

  function faviconUrl(siteUrl, size = 32) {
    try {
      const origin = new URL(siteUrl.split('{title}').join('x')).origin;
      const u = new URL(chrome.runtime.getURL('/_favicon/'));
      u.searchParams.set('pageUrl', origin);
      u.searchParams.set('size', String(size));
      return u.toString();
    } catch (_) {
      return '';
    }
  }

  root.KS = Object.freeze({
    LANGS, THEMES, PRESETS, STRINGS,
    defaults, detectLang, isSafeUrl, isValidTemplate, buildUrl,
    sanitizeSettings, resolveTheme, faviconUrl
  });
})();
