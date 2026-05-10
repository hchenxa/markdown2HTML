document.addEventListener('DOMContentLoaded', function () {
  var enabledEl = document.getElementById('enabled');
  var themeEl = document.getElementById('theme');

  chrome.storage.sync.get({ enabled: true, theme: 'auto' }, function (data) {
    enabledEl.checked = data.enabled;
    themeEl.value = data.theme;
  });

  enabledEl.addEventListener('change', function () {
    chrome.storage.sync.set({ enabled: enabledEl.checked });
  });

  themeEl.addEventListener('change', function () {
    chrome.storage.sync.set({ theme: themeEl.value });
  });
});
