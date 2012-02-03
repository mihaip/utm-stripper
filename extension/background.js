function getStrippedUrl(url) {
 if (url.indexOf('utm_') <= url.indexOf('?')) return url;

  var strippedUrl =
      url.replace(/([\?\&]utm_(source|medium|campaign|content)=[^&#]+)/ig, '');

  // If there were other query parameters, and the utm_ ones were first, then
  // we need to convert the first ampersand to a ? to still have a valid URL.
  if (strippedUrl.indexOf('&') != -1 && strippedUrl.indexOf('?') == -1) {
    strippedUrl = strippedUrl.replace('&', '?');
  }

  return strippedUrl;
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  var strippedUrl = getStrippedUrl(tab.url);
  if (strippedUrl == tab.url) return;

  chrome.tabs.executeScript(
      tabId,
      {code: 'history.replaceState(undefined, undefined, "' + strippedUrl + '");'});
});