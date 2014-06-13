Removes Google Analytics/Urchin tracking parameters (`utm_source`, `utm_medium`, etc.) from URLs that are displayed in the address bar. This is done as a purely aesthetic post-processing step, the site still sees the parameters at initial loading time.

Also cleans up YouTube URLs slightly.

This extension is a variant of the [Tracking Token Stripper](https://chrome.google.com/webstore/detail/kcpnkledgcbobhkgimpbmejgockkplob) extension with two improvements:

* It uses [history.replaceState()](http://www.whatwg.org/specs/web-apps/current-work/multipage/history.html#dom-history-replacestate) to avoid reloading the page when removing the parameters.
* It leaves parameters and fragments after the tracking ones alone, thus not breaking Evite.

Available at the Chrome Web Store at [https://chrome.google.com/webstore/detail/jbgedkkfkohoehhkknnmlodlobbhafge](https://chrome.google.com/webstore/detail/jbgedkkfkohoehhkknnmlodlobbhafge).
