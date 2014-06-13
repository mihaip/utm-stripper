function getStrippedUrl(url) {
 if (url.indexOf('utm_') > url.indexOf('?')) {
    url = url.replace(
        /([\?\&]utm_(reader|source|medium|campaign|content|term)=[^&#]+)/ig,
        '');
  }

  if (url.indexOf('http://www.youtube.com/watch') == 0 ||
      url.indexOf('https://www.youtube.com/watch') == 0) {
    url = url.replace(/([\?\&]feature=[^&#]+)/ig, '');
  }

  // If there were other query parameters, and the stripped ones were first,
  // then we need to convert the first ampersand to a ? to still have a valid
  // URL.
  if (url.indexOf('&') != -1 && url.indexOf('?') == -1) {
    url = url.replace('&', '?');
  }

  return url;
}

chrome.webNavigation.onDOMContentLoaded.addListener(
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
  {
    url: [
      {queryContains: 'utm_'},
      {hostEquals: 'www.youtube.com', pathPrefix: '/watch'},
    ]
  });
