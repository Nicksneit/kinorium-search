(() => {
  'use strict';
  if (window.__kinoriumSearchLoaded) return;
  window.__kinoriumSearchLoaded = true;

  const KS = globalThis.KS;
  const BTN_CLASS = 'ks-btn';
  const DEFAULTS = KS.defaults();
  let settings = { ...DEFAULTS };

  // После перезагрузки/обновления расширения старый скрипт остаётся на странице,
  // но chrome.* в нём уже не работает — проверяем это перед каждым вызовом.
  const alive = () => {
    try { return Boolean(chrome.runtime && chrome.runtime.id); } catch (_) { return false; }
  };
  const t = () => KS.STRINGS[settings.interfaceLang] || KS.STRINGS.en;

  /* ---------- Настройки ---------- */

  function loadSettings() {
    return new Promise(resolve => {
      if (!alive()) return resolve(settings);
      chrome.storage.sync.get(DEFAULTS, data => {
        settings = { ...DEFAULTS, ...data };
        resolve(settings);
      });
    });
  }

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== 'sync') return;
    for (const [key, { newValue }] of Object.entries(changes)) {
      settings[key] = newValue === undefined ? DEFAULTS[key] : newValue;
    }
    updateButton();
    closeMenu();
  });

  /* ---------- Названия фильма ---------- */

  const clean = s => (s || '').replace(/\s+/g, ' ').trim();
  const isLatin = s => /[A-Za-z]/.test(s) && !/[А-Яа-яЁёІіЇїЄєҐґ]/.test(s);

  function readLdJson() {
    for (const script of document.querySelectorAll('script[type="application/ld+json"]')) {
      try {
        const data = JSON.parse(script.textContent);
        const list = Array.isArray(data) ? data : (data['@graph'] || [data]);
        const item = list.find(x => x && /Movie|Series|CreativeWork/i.test(String(x['@type'])));
        if (item) return item;
      } catch (_) { /* битый JSON — пропускаем */ }
    }
    return null;
  }

  function getTitles() {
    const main = clean(document.querySelector('h1')?.textContent) ||
                 clean(document.title.split(/[—(|]/)[0]);

    let year = '';
    const yearEl = document.querySelector('.film-page__title-label, .film-page__date');
    const yearSrc = yearEl ? yearEl.textContent : document.title;
    year = (yearSrc.match(/\b(18|19|20)\d{2}\b/) || [''])[0];

    let original = '';
    const selectors = [
      '.film-page__orig_with_comment',
      '.film-page__original-title',
      'span[itemprop="alternativeHeadline"]',
      '.original-title',
      'meta[property="og:title"]'
    ];
    for (const sel of selectors) {
      const el = document.querySelector(sel);
      if (!el) continue;
      const text = clean(el.getAttribute('content') || el.textContent).replace(/\s*\(\d{4}\).*$/, '').trim();
      if (text && isLatin(text)) { original = text; break; }
    }

    if (!original || !year) {
      const ld = readLdJson();
      if (ld) {
        const alt = [].concat(ld.alternateName || []).map(clean).find(isLatin);
        if (!original && alt) original = alt;
        if (!year) year = (String(ld.datePublished || ld.dateCreated || '').match(/\d{4}/) || [''])[0];
      }
    }

    return { main, original: original || main, hasOriginal: Boolean(original && original !== main), year };
  }

  /* ---------- Кнопка ---------- */

  function updateButton() {
    const btn = document.querySelector('.' + BTN_CLASS);
    if (!btn) return;
    btn.textContent = settings.buttonText || '🔍';
    btn.title = t().btnTitle;
    btn.setAttribute('aria-label', t().btnTitle);
    btn.dataset.ksTheme = KS.resolveTheme(settings.buttonTheme);
  }

  function createButton() {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = BTN_CLASS;
    btn.setAttribute('aria-haspopup', 'menu');
    btn.setAttribute('aria-expanded', 'false');
    btn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      if (menu) closeMenu(); else openMenu(btn, e.detail === 0);
    });
    return btn;
  }

  function injectButton() {
    if (!alive()) { observer.disconnect(); return; }
    const container = document.querySelector('.film-page__title-buttons');
    if (!container || container.querySelector('.' + BTN_CLASS)) return;
    container.appendChild(createButton());
    updateButton();
  }

  /* ---------- Меню (в Shadow DOM — стили сайта на него не влияют) ---------- */

  const ICONS = {
    copy: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2.5"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></svg>',
    check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    gear: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
    stack: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="7" y="7" width="13" height="13" rx="2.5"/><path d="M4 15V6a2 2 0 0 1 2-2h9"/></svg>'
  };

  // Цветные иконки (SVG вместо эмодзи: эмодзи-шрифты по-разному смещают глиф по вертикали)
  let clipSeq = 0;
  const COLOR_ICON = {
    globe() {
      const id = `ksg${++clipSeq}`;
      return `<svg class="ci" viewBox="0 0 32 32" aria-hidden="true">
        <defs><clipPath id="${id}"><circle cx="16" cy="16" r="13"/></clipPath></defs>
        <circle cx="16" cy="16" r="13" fill="#3d8ee6"/>
        <g clip-path="url(#${id})" fill="#5cc25a">
          <path d="M13.5 2.5c-2.6.9-4 2.6-3.7 4.4.3 1.6 1.9 2 3.2 2.6 1.2.6 1.1 1.9-.1 2.6-1.6.9-3.6.8-4.6 2.4-.9 1.4-.2 3.1 1.3 3.8 1.8.8 2.6 2.4 2.5 4.3-.1 2 .9 3.8 2.6 4.6 1.2.6 2.4-.1 2.6-1.4.4-2.2 1.8-3.7 3.4-5 1.4-1.1 1.4-2.9.2-4-1-.9-2.6-.9-3.5-1.9-.6-.7-.1-1.7.8-1.8 1.9-.2 3.7.7 5 2 .8.8 2.1.4 2.3-.7.3-2-.7-3.9-2.3-5.1-2.3-1.8-5.1-2.6-7.7-2.6z"/>
          <path d="M3 13.5c1.8-.6 3.5.1 4.1 1.6.6 1.6-.3 3.2-1.8 3.8-1.3.5-2.8.1-3.6-.9z"/>
          <path d="M25.5 21.5c1.4-.4 2.8.4 3 1.7.2 1.2-.8 2.3-2.1 2.4-1.2.1-2.2-.7-2.3-1.8 0-1 .5-1.9 1.4-2.3z"/>
        </g>
        <circle cx="16" cy="16" r="12.4" fill="none" stroke="rgba(255,255,255,.22)" stroke-width="1.2"/>
        <path d="M8.5 9.5a10 10 0 0 1 6-4" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="1.6" stroke-linecap="round"/>
      </svg>`;
    },
    calendar() {
      return `<svg class="ci" viewBox="0 0 32 32" aria-hidden="true">
        <rect x="4" y="6.5" width="24" height="22" rx="4" fill="#eceef4"/>
        <path d="M8 6.5h16a4 4 0 0 1 4 4v3.5H4v-3.5a4 4 0 0 1 4-4z" fill="#e5484d"/>
        <rect x="9.6" y="3.5" width="2.8" height="6.5" rx="1.4" fill="#4b4f5c"/>
        <rect x="19.6" y="3.5" width="2.8" height="6.5" rx="1.4" fill="#4b4f5c"/>
        <g fill="#a3a8b6">
          <rect x="7.5" y="17" width="3.6" height="3.2" rx=".8"/><rect x="12.5" y="17" width="3.6" height="3.2" rx=".8"/>
          <rect x="17.5" y="17" width="3.6" height="3.2" rx=".8"/>
          <rect x="7.5" y="22" width="3.6" height="3.2" rx=".8"/><rect x="12.5" y="22" width="3.6" height="3.2" rx=".8"/>
          <rect x="17.5" y="22" width="3.6" height="3.2" rx=".8"/><rect x="22.5" y="22" width="3.6" height="3.2" rx=".8"/>
        </g>
        <rect x="22.5" y="17" width="3.6" height="3.2" rx=".8" fill="#e5484d"/>
      </svg>`;
    }
  };

  const MENU_CSS = `
    :host { all: initial; position: absolute; top: 0; left: 0; z-index: 2147483646; }
    * { box-sizing: border-box; }
    .panel {
      --accent: #5b9dff;
      width: 300px; max-width: calc(100vw - 16px);
      font: 14px/1.35 system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
      color: var(--fg); background: var(--bg);
      border: 1px solid var(--border); border-radius: 14px;
      box-shadow: 0 18px 50px -12px rgba(0,0,0,.55), 0 4px 14px rgba(0,0,0,.18);
      backdrop-filter: blur(18px) saturate(1.5); -webkit-backdrop-filter: blur(18px) saturate(1.5);
      overflow: hidden;
      opacity: 0; transform: translateY(-6px) scale(.98); transform-origin: top right;
      transition: opacity .16s ease, transform .16s cubic-bezier(.2,.8,.2,1);
    }
    .panel.up { transform-origin: bottom right; transform: translateY(6px) scale(.98); }
    .panel.open { opacity: 1; transform: none; }
    @media (prefers-reduced-motion: reduce) { .panel { transition: none; } }

    .theme-dark  { --bg: rgba(30,30,34,.94); --fg: #f2f2f4; --muted: #9b9ba6; --border: rgba(255,255,255,.09); --line: rgba(255,255,255,.07); --hover: rgba(255,255,255,.07); --hover2: rgba(255,255,255,.13); --chip: rgba(255,255,255,.06); --lift: 0 4px 12px -4px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.05); }
    .theme-gray  { --bg: rgba(64,64,70,.95);  --fg: #f4f4f6; --muted: #b8b8c2; --border: rgba(255,255,255,.12); --line: rgba(255,255,255,.09); --hover: rgba(255,255,255,.09); --hover2: rgba(255,255,255,.16); --chip: rgba(255,255,255,.08); --lift: 0 4px 12px -4px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.06); }
    .theme-light { --bg: rgba(255,255,255,.96); --fg: #1c1c1f; --muted: #6c6c75; --border: rgba(0,0,0,.08); --line: rgba(0,0,0,.06); --hover: rgba(0,0,0,.045); --hover2: rgba(0,0,0,.08); --chip: rgba(0,0,0,.04); --accent: #2f6fe0; --lift: 0 4px 12px -5px rgba(0,0,0,.22); }

    svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; flex: none; }

    .head { display: flex; gap: 8px; padding: 12px 12px 10px 14px; border-bottom: 1px solid var(--line); }
    .titles { flex: 1; min-width: 0; display: grid; gap: 2px; }
    .tline { display: flex; align-items: center; gap: 4px; min-width: 0; }
    .tline span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .tmain { font-weight: 650; font-size: 14.5px; }
    .tsub { color: var(--muted); font-size: 12.5px; }
    .year { flex: none; padding: 0 6px; border-radius: 6px; background: var(--chip); color: var(--muted); font-size: 11.5px; line-height: 18px; font-variant-numeric: tabular-nums; }

    .icon-btn {
      all: unset; flex: none; display: inline-grid; place-items: center;
      width: 26px; height: 26px; border-radius: 7px; color: var(--muted); cursor: pointer;
      transition: background .12s, color .12s;
    }
    .icon-btn:hover { background: var(--hover2); color: var(--fg); }
    .icon-btn:focus-visible, a:focus-visible, .empty-btn:focus-visible { outline: 2px solid var(--accent); outline-offset: -2px; }
    .icon-btn.small { width: 22px; height: 22px; opacity: 0; }
    .icon-btn.small svg { width: 13px; height: 13px; }
    .tline:hover .icon-btn.small, .icon-btn.small:focus-visible, .icon-btn.small.done { opacity: 1; }
    .icon-btn.done { color: #3ccf7a; }

    .list { padding: 6px; display: grid; gap: 2px; max-height: min(60vh, 420px); overflow-y: auto; scrollbar-width: thin; }
    .row {
      display: flex; align-items: stretch; gap: 2px; border-radius: 10px;
      transition: background .15s ease, box-shadow .15s ease;
    }
    .row:hover { background: var(--hover); box-shadow: var(--lift); }
    a { color: inherit; text-decoration: none; }
    .main { flex: 1; min-width: 0; display: flex; align-items: center; gap: 10px; padding: 7px 8px; border-radius: 9px; cursor: pointer; }
    .main span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .main:hover { background: var(--hover2); }
    .fav { width: 18px; height: 18px; border-radius: 5px; flex: none; display: grid; place-items: center; font-size: 11px; font-weight: 700; color: #fff; overflow: hidden; }
    .fav img { width: 100%; height: 100%; display: block; }
    .alt {
      flex: none; width: 38px; display: flex; align-items: center; justify-content: center;
      border-radius: 9px; cursor: pointer;
      opacity: .85; transition: background .12s, opacity .12s;
    }
    .alt > span { display: contents; }
    .alt svg.ci { display: block; width: 22px; height: 22px; stroke: none; fill: initial; transition: transform .12s; }
    .alt:hover { background: var(--hover2); opacity: 1; }
    .alt:hover svg.ci { transform: scale(1.08); }

    .pick { all: unset; flex: none; width: 26px; display: flex; align-items: center; justify-content: center; cursor: pointer; border-radius: 8px; }
    .pick i {
      display: flex; align-items: center; justify-content: center;
      width: 14px; height: 14px; border-radius: 4px;
      border: 1.5px solid var(--muted); opacity: .3;
      transition: opacity .12s, border-color .12s;
    }
    .pick svg { width: 10px; height: 10px; stroke-width: 2.6; opacity: 0; transition: opacity .12s; }
    .row:hover .pick i { opacity: .55; }
    .pick:hover i { opacity: .85; }
    .pick[aria-checked="true"] i { opacity: .8; border-color: var(--fg); }
    .pick[aria-checked="true"] svg { opacity: 1; }
    .pick:focus-visible { outline: 2px solid var(--accent); outline-offset: -2px; }
    .foot .spacer { flex: none; width: 26px; }

    .foot { border-top: 1px solid var(--line); padding: 6px; }
    .foot .main { color: var(--muted); font-size: 13px; }
    .foot .fav { color: inherit; }
    .foot .row:hover .main, .foot .main:hover { color: var(--fg); }
    .foot .count { color: var(--fg); font-weight: 600; font-variant-numeric: tabular-nums; }

    .empty { padding: 18px 16px; text-align: center; color: var(--muted); display: grid; gap: 12px; justify-items: center; }
    .empty-btn { all: unset; cursor: pointer; padding: 8px 14px; border-radius: 9px; background: var(--accent); color: #fff; font-weight: 600; font-size: 13px; }
    .empty-btn:hover { filter: brightness(1.08); }
  `;

  let menu = null;        // { host, panel, anchor, cleanup }

  function el(tag, attrs = {}, children = []) {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === 'text') node.textContent = v;
      else if (k === 'html') node.innerHTML = v;      // только для статичных SVG-иконок
      else if (k.startsWith('on')) node.addEventListener(k.slice(2), v);
      else if (v !== undefined && v !== null && v !== false) node.setAttribute(k, v === true ? '' : v);
    }
    for (const c of [].concat(children)) if (c) node.append(c);
    return node;
  }

  function letterColor(name) {
    let h = 0;
    for (const ch of name) h = (h * 31 + ch.codePointAt(0)) % 360;
    return `hsl(${h} 55% 45%)`;
  }

  function favicon(site) {
    const box = el('span', { class: 'fav' });
    const letter = () => {
      box.textContent = (site.name.trim()[0] || '?').toUpperCase();
      box.style.background = letterColor(site.name);
    };
    const src = alive() ? KS.faviconUrl(site.url) : '';
    if (!src) { letter(); return box; }
    const img = el('img', { src, alt: '', loading: 'lazy', decoding: 'async' });
    img.addEventListener('error', () => { img.remove(); letter(); }, { once: true });
    box.append(img);
    return box;
  }

  function copyButton(text) {
    const btn = el('button', { class: 'icon-btn small', type: 'button', title: t().copy, 'aria-label': t().copy, html: ICONS.copy });
    btn.addEventListener('click', async e => {
      e.stopPropagation();
      try {
        await navigator.clipboard.writeText(text);
        btn.innerHTML = ICONS.check;
        btn.classList.add('done');
        btn.title = t().copied;
        setTimeout(() => {
          btn.innerHTML = ICONS.copy;
          btn.classList.remove('done');
          btn.title = t().copy;
        }, 1200);
      } catch (_) { /* буфер обмена недоступен */ }
    });
    return btn;
  }

  // Обычный клик — открыть и закрыть меню; Ctrl/⌘/средняя кнопка — открыть в фоне, меню остаётся.
  function onLinkClick(e) {
    if (e.button === 0 && !e.ctrlKey && !e.metaKey && !e.shiftKey) setTimeout(closeMenu, 0);
  }

  function link(cls, href, content, title) {
    return el('a', { class: cls, href, target: '_blank', rel: 'noopener noreferrer', title, onclick: onLinkClick }, content);
  }

  function buildMenu(info) {
    const s = t();
    const theme = KS.resolveTheme(settings.buttonTheme);
    const sites = (Array.isArray(settings.sites) ? settings.sites : [])
      .filter(x => x && x.name && KS.isValidTemplate(x.url));

    const panel = el('div', { class: `panel theme-${theme}`, role: 'menu' });

    // Заголовок: что именно будет искаться
    const mainLine = el('div', { class: 'tline tmain' }, [el('span', { text: info.main }), copyButton(info.main)]);
    const subParts = [];
    if (info.hasOriginal) subParts.push(el('span', { text: info.original }));
    if (info.year) subParts.push(el('span', { class: 'year', text: info.year }));
    if (info.hasOriginal) subParts.push(copyButton(info.original));
    const titles = el('div', { class: 'titles' }, [mainLine, subParts.length ? el('div', { class: 'tline tsub' }, subParts) : null]);
    const gear = el('button', {
      class: 'icon-btn', type: 'button', title: s.settings, 'aria-label': s.settings, html: ICONS.gear,
      onclick: () => { openOptions(); closeMenu(); }
    });
    panel.append(el('div', { class: 'head' }, [titles, gear]));

    if (!sites.length) {
      panel.append(el('div', { class: 'empty' }, [
        el('div', { text: s.noSites }),
        el('button', { class: 'empty-btn', type: 'button', text: s.openSettings, onclick: () => { openOptions(); closeMenu(); } })
      ]));
      return panel;
    }

    const variants = [
      { title: info.main, withYear: false },
      { title: info.original, withYear: false },
      { title: info.original, withYear: true }
    ];
    const urlFor = (site, v) => KS.buildUrl(site.url, variants[v].title, info.year, variants[v].withYear);
    const yearHint = info.year ? ` (${info.year})` : '';

    const multi = settings.showOpenAll !== false && sites.length > 1;
    const selected = new Set();
    let footLabel = null;
    const refreshFoot = () => {
      if (!footLabel) return;
      footLabel.replaceChildren(selected.size
        ? el('span', {}, [`${s.openSelected}: `, el('span', { class: 'count', text: String(selected.size) })])
        : el('span', { text: s.openAll }));
    };
    const pick = site => {
      const box = el('button', {
        class: 'pick', type: 'button', role: 'checkbox', 'aria-checked': 'false', title: s.pick, 'aria-label': s.pick
      }, el('i', { html: ICONS.check }));
      box.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        if (selected.has(site)) selected.delete(site); else selected.add(site);
        box.setAttribute('aria-checked', String(selected.has(site)));
        refreshFoot();
      });
      return box;
    };

    const list = el('div', { class: 'list' });
    for (const site of sites) {
      list.append(el('div', { class: 'row', role: 'none' }, [
        link('main', urlFor(site, 0), [settings.showIcons !== false ? favicon(site) : null, el('span', { text: site.name })], `${s.search}: ${info.main}`),
        multi ? pick(site) : null,
        link('alt', urlFor(site, 1), el('span', { html: COLOR_ICON.globe() }), `${s.byOriginal}: ${info.original}`),
        link('alt', urlFor(site, 2), el('span', { html: COLOR_ICON.calendar() }), `${s.byOriginalYear}${yearHint}`)
      ]));
    }
    panel.append(list);

    if (multi) {
      const openAll = v => e => {
        e.preventDefault();
        const targets = selected.size ? sites.filter(x => selected.has(x)) : sites;
        if (alive()) chrome.runtime.sendMessage({ type: 'openTabs', urls: targets.map(site => urlFor(site, v)) });
        closeMenu();
      };
      const btn = (cls, content, title, v) =>
        el('a', { class: cls, href: '#', role: 'button', title, onclick: openAll(v) }, content);
      footLabel = el('span');
      refreshFoot();
      panel.append(el('div', { class: 'foot' }, el('div', { class: 'row' }, [
        btn('main', [settings.showIcons !== false ? el('span', { class: 'fav', html: ICONS.stack }) : null, footLabel], s.openAll, 0),
        el('span', { class: 'spacer' }),
        btn('alt', el('span', { html: COLOR_ICON.globe() }), `${s.openAll} — ${s.byOriginal.toLowerCase()}`, 1),
        btn('alt', el('span', { html: COLOR_ICON.calendar() }), `${s.openAll} — ${s.byOriginalYear.toLowerCase()}`, 2)
      ])));
    }

    return panel;
  }

  function positionMenu() {
    if (!menu) return;
    const { host, panel, anchor } = menu;
    if (!anchor.isConnected) { closeMenu(); return; }
    const r = anchor.getBoundingClientRect();
    const w = panel.offsetWidth;
    const h = panel.offsetHeight;
    const gap = 8;

    let left = r.right - w;
    left = Math.max(8, Math.min(left, window.innerWidth - w - 8));

    const spaceBelow = window.innerHeight - r.bottom;
    const up = spaceBelow < h + gap && r.top > spaceBelow;
    const top = up ? r.top - h - gap : r.bottom + gap;
    panel.classList.toggle('up', up);

    host.style.left = `${left + window.scrollX}px`;
    host.style.top = `${top + window.scrollY}px`;
  }

  async function openMenu(anchor, viaKeyboard = false) {
    closeMenu();
    await loadSettings();
    if (!anchor.isConnected) return;

    const host = document.createElement('kinorium-search-menu');
    const shadow = host.attachShadow({ mode: 'open' });
    shadow.append(el('style', { text: MENU_CSS }));
    const panel = buildMenu(getTitles());
    shadow.append(panel);
    document.body.append(host);

    menu = { host, panel, anchor, cleanup: null };
    anchor.setAttribute('aria-expanded', 'true');
    positionMenu();
    requestAnimationFrame(() => panel.classList.add('open'));

    const onPointer = e => {
      const path = e.composedPath();
      if (!path.includes(host) && !path.includes(anchor)) closeMenu();
    };
    const onKey = e => {
      if (e.key === 'Escape') { closeMenu(); anchor.focus(); }
    };
    const onResize = () => positionMenu();

    document.addEventListener('pointerdown', onPointer, true);
    document.addEventListener('keydown', onKey, true);
    window.addEventListener('resize', onResize);
    menu.cleanup = () => {
      document.removeEventListener('pointerdown', onPointer, true);
      document.removeEventListener('keydown', onKey, true);
      window.removeEventListener('resize', onResize);
    };

    if (viaKeyboard) panel.querySelector('a.main')?.focus({ preventScroll: true });
  }

  function closeMenu() {
    if (!menu) return;
    menu.cleanup?.();
    menu.anchor.setAttribute('aria-expanded', 'false');
    menu.host.remove();
    menu = null;
  }

  function openOptions() {
    if (alive()) chrome.runtime.sendMessage({ type: 'openOptions' });
  }

  /* ---------- Запуск ---------- */

  // Сайт может перерисовывать шапку фильма — следим, но не чаще раза за кадр.
  let scheduled = false;
  const observer = new MutationObserver(() => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => { scheduled = false; injectButton(); });
  });

  loadSettings().then(() => {
    injectButton();
    observer.observe(document.body, { childList: true, subtree: true });
  });

  try {
    matchMedia('(prefers-color-scheme: light)').addEventListener('change', () => {
      if (settings.buttonTheme === 'auto') updateButton();
    });
  } catch (_) { /* старый браузер */ }
})();
