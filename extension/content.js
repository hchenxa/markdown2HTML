(function () {
  if (document.querySelector('.md-viewer-active')) return;

  const pre = document.querySelector('pre');
  const body = document.body;
  const isPlainText =
    pre &&
    body.children.length === 1 &&
    body.firstElementChild === pre &&
    !document.querySelector('script[src], link[rel="stylesheet"]');

  if (!isPlainText) return;

  chrome.storage.sync.get({ enabled: true }, function (data) {
    if (!data.enabled) return;
    render(pre.textContent);
  });

  function render(rawText) {
    const url = location.href;
    const filename = decodeURIComponent(url.split('/').pop().split('?')[0] || 'Untitled.md');

    document.title = filename + ' - MD Viewer';
    document.documentElement.removeAttribute('style');
    body.className = 'md-viewer-active';
    body.innerHTML = '';

    // Theme
    chrome.storage.sync.get({ theme: 'auto' }, function (data) {
      applyTheme(data.theme);
    });

    function applyTheme(pref) {
      let dark = false;
      if (pref === 'dark') dark = true;
      else if (pref === 'auto') dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    }

    // Toolbar
    const toolbar = document.createElement('div');
    toolbar.className = 'md-toolbar';
    toolbar.innerHTML =
      '<div class="md-toolbar-left">' +
        '<span class="md-toolbar-logo">MD Viewer</span>' +
        '<span class="md-toolbar-filename">' + escapeHtml(filename) + '</span>' +
      '</div>' +
      '<div class="md-toolbar-right">' +
        '<button class="md-btn" id="mdTocToggle" title="Table of Contents">' +
          '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M2 3h12v1.5H2V3zm0 4h8v1.5H2V7zm0 4h10v1.5H2V11z"/></svg>' +
          ' TOC' +
        '</button>' +
        '<button class="md-btn" id="mdThemeToggle" title="Toggle Theme">' +
          '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 12.5V2.5a5.5 5.5 0 0 1 0 11z"/></svg>' +
        '</button>' +
        '<button class="md-btn" id="mdRawToggle" title="View Raw">' +
          '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M4.72 3.22a.75.75 0 0 1 1.06 1.06L2.56 7.5h10.88a.75.75 0 0 1 0 1.5H2.56l3.22 3.22a.75.75 0 1 1-1.06 1.06l-4.5-4.5a.75.75 0 0 1 0-1.06l4.5-4.5z"/></svg>' +
          ' Raw' +
        '</button>' +
      '</div>';
    body.appendChild(toolbar);

    // TOC
    const toc = document.createElement('div');
    toc.className = 'md-toc';
    toc.id = 'mdToc';
    body.appendChild(toc);

    // Content
    const content = document.createElement('div');
    content.className = 'md-content';
    content.id = 'mdContent';
    const markdownBody = document.createElement('div');
    markdownBody.className = 'markdown-body';
    markdownBody.id = 'mdBody';
    content.appendChild(markdownBody);
    body.appendChild(content);

    // Scroll to top
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'md-scroll-top';
    scrollBtn.id = 'mdScrollTop';
    scrollBtn.title = 'Scroll to top';
    scrollBtn.innerHTML = '&#8593;';
    body.appendChild(scrollBtn);

    // Configure marked
    marked.setOptions({
      gfm: true,
      breaks: true,
      highlight: function (code, lang) {
        if (lang && hljs.getLanguage(lang)) {
          return hljs.highlight(code, { language: lang }).value;
        }
        return hljs.highlightAuto(code).value;
      }
    });

    // Render markdown
    markdownBody.innerHTML = marked.parse(rawText);

    // Build TOC
    buildTOC();

    // Event listeners
    document.getElementById('mdTocToggle').addEventListener('click', function () {
      const isOpen = toc.classList.toggle('active');
      content.classList.toggle('toc-open', isOpen);
    });

    document.getElementById('mdThemeToggle').addEventListener('click', function () {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const newTheme = isDark ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      chrome.storage.sync.set({ theme: newTheme });
    });

    document.getElementById('mdRawToggle').addEventListener('click', function () {
      body.className = '';
      body.innerHTML = '';
      document.documentElement.removeAttribute('data-theme');
      const newPre = document.createElement('pre');
      newPre.textContent = rawText;
      body.appendChild(newPre);
      document.title = filename;
    });

    scrollBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', function () {
      if (window.scrollY > 300) {
        scrollBtn.classList.add('visible');
      } else {
        scrollBtn.classList.remove('visible');
      }

      // Scroll spy
      const tocLinks = toc.querySelectorAll('a');
      if (tocLinks.length === 0) return;
      const headings = markdownBody.querySelectorAll('[id^="heading-"]');
      let current = '';
      headings.forEach(function (h) {
        if (window.scrollY >= h.offsetTop - 80) {
          current = h.id;
        }
      });
      tocLinks.forEach(function (a) {
        a.classList.toggle('toc-active', a.getAttribute('href') === '#' + current);
      });
    });

    function buildTOC() {
      const headings = markdownBody.querySelectorAll('h1, h2, h3, h4');
      if (headings.length < 3) {
        document.getElementById('mdTocToggle').style.display = 'none';
        return;
      }

      var tocHTML = '<div class="md-toc-title">Contents</div>';
      headings.forEach(function (h, i) {
        var id = 'heading-' + i;
        h.id = id;
        var level = h.tagName.toLowerCase();
        tocHTML += '<a href="#' + id + '" class="toc-' + level + '">' + escapeHtml(h.textContent) + '</a>';
      });
      toc.innerHTML = tocHTML;
    }
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
})();
