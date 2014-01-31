function getStrippedUrl(url) {
 if (url.indexOf('utm_') <= url.indexOf('?')) return url;

  var strippedUrl =
      url.replace(/([\?\&]utm_(reader|source|medium|campaign|content)=[^&#]+)/ig, '');

  // If there were other query parameters, and the utm_ ones were first, then
  // we need to convert the first ampersand to a ? to still have a valid URL.
  if (strippedUrl.indexOf('&') != -1 && strippedUrl.indexOf('?') == -1) {
    strippedUrl = strippedUrl.replace('&', '?');
  }

  return strippedUrl;
}

chrome.webNavigation.onCompleted.addListener(
  function(details) {
    // Ignore subframe navigations.
    if (details.frameId != 0) return;

    var url = details.url;
    var strippedUrl = getStrippedUrl(url);
    if (strippedUrl == url) return;

    chrome.tabs.executeScript(
        details.tabId,
        {code: 'history.replaceState(undefined, undefined, "' + strippedUrl + '");'});
  },
  {url: [{queryContains: 'utm_'}]});
