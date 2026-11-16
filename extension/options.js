(() => {
  'use strict';

  const L = {
    ru: {
      optionsTitle: 'Настройки — Kinorium Search',
      subtitle: 'Быстрый поиск фильма на других сайтах',
      appearanceHeader: 'Внешний вид',
      labelBtnText: 'Текст кнопки',
      labelBtnTheme: 'Тема',
      themeDark: 'Тёмная', themeLight: 'Светлая', themeGray: 'Серая', themeAuto: 'Авто',
      preview: 'Предпросмотр', previewTitle: 'Начало',
      sitesHeader: 'Сайты для поиска',
      addSiteBtn: 'Добавить сайт',
      placeholdersHint: 'В адресе укажите {title} — туда подставится название фильма.',
      menuHeader: 'Меню', showIcons: 'Иконки сайтов', showIconsHint: 'Значки сайтов в меню и в списке ниже',
      showOpenAll: '«Открыть все»', showOpenAllHint: 'Отметки у сайтов и кнопка открытия нескольких сайтов сразу',
      emptySites: 'Список пуст — добавьте сайт вручную или выберите из популярных ниже.',
      presetsLabel: 'Быстро добавить',
      backupHeader: 'Резервная копия',
      exportBtn: 'Экспорт', importBtn: 'Импорт', resetBtn: 'Сбросить',
      autosaveNote: 'Изменения сохраняются автоматически.',
      placeholderName: 'Название', placeholderUrl: 'https://example.com/search?q={title}',
      drag: 'Перетащите, чтобы изменить порядок',
      up: 'Выше', down: 'Ниже', test: 'Проверить на примере', remove: 'Удалить',
      errName: 'Укажите название', errUrl: 'Адрес должен начинаться с http(s):// и содержать {title}',
      saved: 'Сохранено', notSaved: 'Есть ошибки — такие сайты не сохранены',
      removed: 'Сайт «{name}» удалён', undo: 'Отменить',
      added: 'Добавлен: {name}',
      importOk: 'Настройки импортированы', importErr: 'Не удалось прочитать файл настроек',
      resetConfirm: 'Сбросить все настройки к значениям по умолчанию?', resetOk: 'Настройки сброшены'
    },
    uk: {
      optionsTitle: 'Налаштування — Kinorium Search',
      subtitle: 'Швидкий пошук фільму на інших сайтах',
      appearanceHeader: 'Зовнішній вигляд',
      labelBtnText: 'Текст кнопки',
      labelBtnTheme: 'Тема',
      themeDark: 'Темна', themeLight: 'Світла', themeGray: 'Сіра', themeAuto: 'Авто',
      preview: 'Попередній перегляд', previewTitle: 'Початок',
      sitesHeader: 'Сайти для пошуку',
      addSiteBtn: 'Додати сайт',
      placeholdersHint: 'В адресі вкажіть {title} — туди підставиться назва фільму.',
      menuHeader: 'Меню', showIcons: 'Іконки сайтів', showIconsHint: 'Значки сайтів у меню та в списку нижче',
      showOpenAll: '«Відкрити всі»', showOpenAllHint: 'Позначки біля сайтів і кнопка відкриття кількох сайтів одразу',
      emptySites: 'Список порожній — додайте сайт вручну або оберіть з популярних нижче.',
      presetsLabel: 'Швидко додати',
      backupHeader: 'Резервна копія',
      exportBtn: 'Експорт', importBtn: 'Імпорт', resetBtn: 'Скинути',
      autosaveNote: 'Зміни зберігаються автоматично.',
      placeholderName: 'Назва', placeholderUrl: 'https://example.com/search?q={title}',
      drag: 'Перетягніть, щоб змінити порядок',
      up: 'Вище', down: 'Нижче', test: 'Перевірити на прикладі', remove: 'Видалити',
      errName: 'Вкажіть назву', errUrl: 'Адреса має починатися з http(s):// і містити {title}',
      saved: 'Збережено', notSaved: 'Є помилки — такі сайти не збережено',
      removed: 'Сайт «{name}» видалено', undo: 'Скасувати',
      added: 'Додано: {name}',
      importOk: 'Налаштування імпортовано', importErr: 'Не вдалося прочитати файл налаштувань',
      resetConfirm: 'Скинути всі налаштування до типових?', resetOk: 'Налаштування скинуто'
    },
    en: {
      optionsTitle: 'Settings — Kinorium Search',
      subtitle: 'Quickly search a movie on other sites',
      appearanceHeader: 'Appearance',
      labelBtnText: 'Button text',
      labelBtnTheme: 'Theme',
      themeDark: 'Dark', themeLight: 'Light', themeGray: 'Gray', themeAuto: 'Auto',
      preview: 'Preview', previewTitle: 'Inception',
      sitesHeader: 'Search sites',
      addSiteBtn: 'Add site',
      placeholdersHint: 'Put {title} in the URL — the movie title goes there.',
      menuHeader: 'Menu', showIcons: 'Site icons', showIconsHint: 'Site icons in the menu and in the list below',
      showOpenAll: '“Open all”', showOpenAllHint: 'Checkboxes next to sites and a button to open several sites at once',
      emptySites: 'The list is empty — add a site manually or pick a popular one below.',
      presetsLabel: 'Quick add',
      backupHeader: 'Backup',
      exportBtn: 'Export', importBtn: 'Import', resetBtn: 'Reset',
      autosaveNote: 'Changes are saved automatically.',
      placeholderName: 'Name', placeholderUrl: 'https://example.com/search?q={title}',
      drag: 'Drag to reorder',
      up: 'Move up', down: 'Move down', test: 'Test with an example', remove: 'Remove',
      errName: 'Enter a name', errUrl: 'URL must start with http(s):// and contain {title}',
      saved: 'Saved', notSaved: 'Some sites have errors and were not saved',
      removed: 'Removed “{name}”', undo: 'Undo',
      added: 'Added: {name}',
      importOk: 'Settings imported', importErr: 'Could not read the settings file',
      resetConfirm: 'Reset all settings to defaults?', resetOk: 'Settings reset'
    }
  };

  const EMOJIS = ['🔍', '🔎', '🎬', '🍿', '🎞️', '🎥'];
  const ICON = {
    grip: '<svg viewBox="0 0 24 24"><circle cx="9" cy="6" r="1.2"/><circle cx="15" cy="6" r="1.2"/><circle cx="9" cy="12" r="1.2"/><circle cx="15" cy="12" r="1.2"/><circle cx="9" cy="18" r="1.2"/><circle cx="15" cy="18" r="1.2"/></svg>',
    up: '<svg viewBox="0 0 24 24"><path d="M6 15l6-6 6 6"/></svg>',
    down: '<svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>',
    test: '<svg viewBox="0 0 24 24"><path d="M14 4h6v6M20 4l-9 9M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4"/></svg>',
    trash: '<svg viewBox="0 0 24 24"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3"/></svg>',
    plus: '<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>'
  };

  const $ = sel => document.querySelector(sel);
  const state = { ...KS.defaults(), sites: [] };
  let uid = 0;
  let lang = 'en';
  const tr = (key, vars = {}) =>
    (L[lang][key] || L.en[key] || key).replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m));

  /* ---------- Утилиты ---------- */

  function h(tag, attrs = {}, children = []) {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === 'text') n.textContent = v;
      else if (k === 'html') n.innerHTML = v; // только статичные иконки
      else if (k.startsWith('on')) n.addEventListener(k.slice(2), v);
      else if (v !== undefined && v !== false) n.setAttribute(k, v === true ? '' : v);
    }
    for (const c of [].concat(children)) if (c) n.append(c);
    return n;
  }

  function letterColor(name) {
    let x = 0;
    for (const ch of name) x = (x * 31 + ch.codePointAt(0)) % 360;
    return `hsl(${x} 55% 45%)`;
  }

  function fillFavicon(box, site) {
    box.replaceChildren();
    box.style.background = '';
    const letter = () => {
      box.textContent = ((site.name || '?').trim()[0] || '?').toUpperCase();
      box.style.background = letterColor(site.name || '?');
    };
    const src = KS.isSafeUrl(site.url) ? KS.faviconUrl(site.url) : '';
    if (!src) return letter();
    const img = h('img', { src, alt: '' });
    img.addEventListener('error', letter, { once: true });
    box.append(img);
  }

  let toastTimer;
  function toast(message, { action, onAction, error = false, ms = 3200 } = {}) {
    const el = $('#toast');
    el.replaceChildren(h('span', { text: message }));
    if (action) {
      el.append(h('button', { type: 'button', text: action, onclick: () => { onAction(); hideToast(); } }));
    }
    el.classList.toggle('error', error);
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(hideToast, ms);
  }
  function hideToast() { $('#toast').classList.remove('show'); }

  let statusTimer;
  function setStatus(kind) {
    const el = $('#status');
    el.className = `status show ${kind}`;
    el.textContent = kind === 'ok' ? `✓ ${tr('saved')}` : `⚠ ${tr('notSaved')}`;
    clearTimeout(statusTimer);
    if (kind === 'ok') statusTimer = setTimeout(() => el.classList.remove('show'), 1800);
  }

  /* ---------- Язык ---------- */

  function applyLanguage(next) {
    lang = L[next] ? next : 'en';
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (el.tagName === 'TITLE') document.title = tr(key);
      else el.textContent = tr(key);
    });
    // Подсказка с выделенными плейсхолдерами
    const hint = $('#placeholdersHint');
    hint.replaceChildren();
    tr('placeholdersHint').split(/(\{title\})/).forEach(part => {
      hint.append(part === '{title}' ? h('code', { text: part }) : part);
    });
    renderSites();
    renderPresets();
  }

  /* ---------- Внешний вид ---------- */

  function renderAppearance() {
    $('#buttonText').value = state.buttonText;
    document.querySelectorAll('#themeGroup input').forEach(r => { r.checked = r.value === state.buttonTheme; });
    $('#showIcons').checked = state.showIcons !== false;
    $('#showOpenAll').checked = state.showOpenAll !== false;
    const chips = $('#emojiChips');
    chips.replaceChildren(...EMOJIS.map(e => h('button', {
      type: 'button', class: 'chip' + (e === state.buttonText ? ' active' : ''), text: e,
      onclick: () => { state.buttonText = e; renderAppearance(); scheduleSave(); }
    })));
    updatePreview();
  }

  function applyPageTheme() {
    document.documentElement.dataset.theme = state.buttonTheme;
    document.body.classList.toggle('no-icons', state.showIcons === false);
  }

  function updatePreview() {
    applyPageTheme();
    const btn = $('#previewBtn');
    btn.textContent = state.buttonText || '🔍';
    btn.dataset.ksTheme = KS.resolveTheme(state.buttonTheme);
  }

  $('#buttonText').addEventListener('input', e => {
    state.buttonText = e.target.value;
    document.querySelectorAll('#emojiChips .chip').forEach(c => c.classList.toggle('active', c.textContent === e.target.value));
    updatePreview();
    scheduleSave();
  });

  $('#themeGroup').addEventListener('change', e => {
    state.buttonTheme = e.target.value;
    updatePreview();
    scheduleSave();
  });

  $('#showIcons').addEventListener('change', e => {
    state.showIcons = e.target.checked;
    applyPageTheme();
    scheduleSave();
  });

  $('#showOpenAll').addEventListener('change', e => {
    state.showOpenAll = e.target.checked;
    scheduleSave();
  });

  matchMedia('(prefers-color-scheme: light)').addEventListener('change', updatePreview);

  $('#interfaceLang').addEventListener('change', e => {
    state.interfaceLang = e.target.value;
    applyLanguage(state.interfaceLang);
    scheduleSave();
  });

  /* ---------- Сайты ---------- */

  function validate(site) {
    if (!site.name.trim()) return { field: 'name', msg: tr('errName') };
    if (!KS.isValidTemplate(site.url.trim())) return { field: 'url', msg: tr('errUrl') };
    return null;
  }

  function showValidation(row, site, force = false) {
    const err = validate(site);
    const touched = force || site.touched;
    const show = err && touched;
    row.classList.toggle('invalid', Boolean(show));
    row.querySelector('.name-input').classList.toggle('bad', Boolean(show && err.field === 'name'));
    row.querySelector('.url-input').classList.toggle('bad', Boolean(show && err.field === 'url'));
    row.querySelector('.err').textContent = show ? err.msg : '';
  }

  function renderSites() {
    const box = $('#sitesContainer');
    box.replaceChildren(...state.sites.map((site, i) => siteRow(site, i)));
    $('#emptySites').hidden = state.sites.length > 0;
  }

  function siteRow(site, index) {
    const fav = h('span', { class: 'fav' });
    fillFavicon(fav, site);

    const nameInput = h('input', {
      type: 'text', class: 'name-input', value: site.name, placeholder: tr('placeholderName'),
      maxlength: '60', spellcheck: 'false', 'aria-label': tr('placeholderName')
    });
    const urlInput = h('input', {
      type: 'url', class: 'url-input', value: site.url, placeholder: tr('placeholderUrl'),
      spellcheck: 'false', 'aria-label': 'URL'
    });

    const row = h('div', { class: 'site', 'data-id': site.id }, [
      h('span', { class: 'handle', title: tr('drag'), html: ICON.grip }),
      fav,
      nameInput,
      urlInput,
      h('div', { class: 'actions' }, [
        h('button', { type: 'button', class: 'icon-btn', title: tr('up'), 'aria-label': tr('up'), html: ICON.up, disabled: index === 0, onclick: () => move(site.id, -1) }),
        h('button', { type: 'button', class: 'icon-btn', title: tr('down'), 'aria-label': tr('down'), html: ICON.down, disabled: index === state.sites.length - 1, onclick: () => move(site.id, 1) }),
        h('button', { type: 'button', class: 'icon-btn', title: tr('test'), 'aria-label': tr('test'), html: ICON.test, onclick: () => testSite(site, row) }),
        h('button', { type: 'button', class: 'icon-btn danger', title: tr('remove'), 'aria-label': tr('remove'), html: ICON.trash, onclick: () => removeSite(site.id) })
      ]),
      h('div', { class: 'err' })
    ]);

    nameInput.addEventListener('input', () => {
      site.name = nameInput.value;
      if (!fav.querySelector('img')) fillFavicon(fav, site);
      showValidation(row, site);
      scheduleSave();
    });
    urlInput.addEventListener('input', () => {
      site.url = urlInput.value;
      showValidation(row, site);
      scheduleSave();
    });
    urlInput.addEventListener('change', () => fillFavicon(fav, site));
    [nameInput, urlInput].forEach(inp => inp.addEventListener('blur', () => {
      site.touched = true;
      showValidation(row, site);
    }));

    setupDrag(row);
    showValidation(row, site);
    return row;
  }

  function addSite(site = { name: '', url: '' }, { focus = true } = {}) {
    const entry = { id: ++uid, name: site.name, url: site.url, touched: false };
    state.sites.push(entry);
    renderSites();
    renderPresets();
    if (focus) $(`.site[data-id="${entry.id}"] .name-input`)?.focus();
    scheduleSave();
    return entry;
  }

  function removeSite(id) {
    const index = state.sites.findIndex(s => s.id === id);
    if (index < 0) return;
    const [removed] = state.sites.splice(index, 1);
    renderSites();
    renderPresets();
    scheduleSave();
    toast(tr('removed', { name: removed.name || '…' }), {
      action: tr('undo'),
      ms: 5000,
      onAction: () => {
        state.sites.splice(index, 0, removed);
        renderSites();
        renderPresets();
        scheduleSave();
      }
    });
  }

  function move(id, dir) {
    const i = state.sites.findIndex(s => s.id === id);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= state.sites.length) return;
    [state.sites[i], state.sites[j]] = [state.sites[j], state.sites[i]];
    renderSites();
    $(`.site[data-id="${id}"] .icon-btn[aria-label="${dir < 0 ? tr('up') : tr('down')}"]`)?.focus();
    scheduleSave();
  }

  function testSite(site, row) {
    site.touched = true;
    showValidation(row, site, true);
    if (validate(site)) return;
    window.open(KS.buildUrl(site.url.trim(), 'Inception', '2010', false), '_blank', 'noopener');
  }

  // Перетаскивание за «ручку»
  let dragged = null;
  function setupDrag(row) {
    const handle = row.querySelector('.handle');
    handle.addEventListener('pointerdown', () => { row.draggable = true; });
    row.addEventListener('dragstart', e => {
      dragged = row;
      row.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', row.dataset.id);
    });
    row.addEventListener('dragend', () => {
      row.draggable = false;
      row.classList.remove('dragging');
      dragged = null;
      const order = [...document.querySelectorAll('#sitesContainer .site')].map(r => Number(r.dataset.id));
      const changed = order.some((id, i) => state.sites[i]?.id !== id);
      if (changed) {
        state.sites.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
        renderSites();
        scheduleSave();
      }
    });
    row.addEventListener('dragover', e => {
      if (!dragged || dragged === row) return;
      e.preventDefault();
      const r = row.getBoundingClientRect();
      const after = e.clientY > r.top + r.height / 2;
      row.parentNode.insertBefore(dragged, after ? row.nextSibling : row);
    });
  }
  document.addEventListener('pointerup', () => {
    if (!dragged) document.querySelectorAll('.site[draggable="true"]').forEach(r => { r.draggable = false; });
  });

  function renderPresets() {
    const have = new Set(state.sites.map(s => {
      try { return new URL(s.url.split('{title}').join('x')).hostname.replace(/^www\./, ''); } catch (_) { return ''; }
    }));
    const box = $('#presets');
    box.replaceChildren(...KS.PRESETS
      .filter(p => !have.has(new URL(p.url.split('{title}').join('x')).hostname.replace(/^www\./, '')))
      .map(p => {
        const img = h('img', { src: KS.faviconUrl(p.url), alt: '' });
        img.addEventListener('error', () => img.remove(), { once: true });
        return h('button', {
          type: 'button', class: 'chip', title: p.url,
          onclick: () => { addSite(p, { focus: false }); toast(tr('added', { name: p.name })); }
        }, [img, h('span', { text: p.name }), h('span', { html: ICON.plus })]);
      }));
  }

  $('#addSite').addEventListener('click', () => addSite());

  /* ---------- Сохранение ---------- */

  let saveTimer;
  function scheduleSave() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(save, 350);
  }

  function collect() {
    const valid = state.sites.filter(s => !validate(s)).map(s => ({ name: s.name.trim(), url: s.url.trim() }));
    return {
      data: {
        sites: valid,
        buttonText: (state.buttonText || '').trim() || '🔍',
        buttonTheme: state.buttonTheme,
        interfaceLang: state.interfaceLang,
        showIcons: state.showIcons !== false,
        showOpenAll: state.showOpenAll !== false
      },
      hasErrors: valid.length !== state.sites.length
    };
  }

  function save() {
    const { data, hasErrors } = collect();
    chrome.storage.sync.set(data, () => {
      if (chrome.runtime.lastError) {
        toast(chrome.runtime.lastError.message, { error: true });
        return;
      }
      setStatus(hasErrors ? 'warn' : 'ok');
    });
  }

  // Сохраняем то, что ещё не успело записаться, при закрытии вкладки
  window.addEventListener('pagehide', () => {
    if (saveTimer) { clearTimeout(saveTimer); save(); }
  });

  /* ---------- Импорт / экспорт / сброс ---------- */

  $('#exportBtn').addEventListener('click', () => {
    chrome.storage.sync.get(KS.defaults(), data => {
      const payload = {
        sites: data.sites, buttonText: data.buttonText,
        buttonTheme: data.buttonTheme, interfaceLang: data.interfaceLang,
        showIcons: data.showIcons, showOpenAll: data.showOpenAll
      };
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const date = new Date().toISOString().slice(0, 10);
      h('a', { href: url, download: `kinorium-search-settings-${date}.json` }).click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    });
  });

  const importInput = $('#importInput');
  $('#importBtn').addEventListener('click', () => importInput.click());
  importInput.addEventListener('change', async () => {
    const file = importInput.files[0];
    importInput.value = '';
    if (!file) return;
    try {
      if (file.size > 200 * 1024) throw new Error('too big');
      const clean = KS.sanitizeSettings(JSON.parse(await file.text()));
      await chrome.storage.sync.set(clean);
      await load();
      toast(tr('importOk'));
    } catch (_) {
      toast(tr('importErr'), { error: true });
    }
  });

  $('#resetBtn').addEventListener('click', async () => {
    if (!confirm(tr('resetConfirm'))) return;
    await chrome.storage.sync.clear();
    await chrome.storage.sync.set(KS.defaults());
    await load();
    toast(tr('resetOk'));
  });

  /* ---------- Загрузка ---------- */

  async function load() {
    const data = await chrome.storage.sync.get(KS.defaults());
    state.buttonText = data.buttonText;
    state.buttonTheme = KS.THEMES.includes(data.buttonTheme) ? data.buttonTheme : 'dark';
    state.interfaceLang = KS.LANGS.includes(data.interfaceLang) ? data.interfaceLang : KS.detectLang();
    state.showIcons = data.showIcons !== false;
    state.showOpenAll = data.showOpenAll !== false;
    state.sites = (Array.isArray(data.sites) ? data.sites : []).map(s => ({
      id: ++uid, name: String(s.name || ''), url: String(s.url || ''), touched: true
    }));
    $('#interfaceLang').value = state.interfaceLang;
    renderAppearance();
    applyLanguage(state.interfaceLang);
  }

  load();
})();
