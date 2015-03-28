function log(msg, opt_color) {
  var msgNode = document.createElement('div');
  if (opt_color) {
	msgNode.style.color = opt_color;
  }
  msgNode.innerText = msg;
  document.getElementById('log').appendChild(msgNode);
}

function assertEquals(expected, actual, opt_msg) {
  if (expected == actual) {
	log('PASS: ' + expected + ' (as expected)');
  } else {
	var msg = opt_msg ? ' ' + opt_msg : '';
	log('FAIL: ' + expected + ' (expected) != ' + actual + ' (actual)' + msg, 'red');
  }
}

var TEST_DATA = {
  'http://example.com/post': 'http://example.com/post',
  'http://example.com/post?foo=bar': 'http://example.com/post?foo=bar',
  'http://example.com/post?utm_source=src&utm_medium=medium&utm_campaign=campaign&utm_reader=feedly': 'http://example.com/post',
  'http://example.com/post?mc_cid=1234&mc_eid=4321': 'http://example.com/post',
  'http://example.com/post?foo=bar&utm_source=src': 'http://example.com/post?foo=bar',
  'http://example.com/post?utm_source=src&foo=bar': 'http://example.com/post?foo=bar',
  'http://example.com/post?utm_source=src#foo=bar': 'http://example.com/post#foo=bar',

  'https://www.youtube.com/watch?v=YlGqN3AKOsA&feature=kp': 'https://www.youtube.com/watch?v=YlGqN3AKOsA',
  'https://www.youtube.com/watch?feature=youtu.be&v=YlGqN3AKOsA': 'https://www.youtube.com/watch?v=YlGqN3AKOsA',
  'http://www.youtube.com/watch?v=YlGqN3AKOsA&feature=kp': 'http://www.youtube.com/watch?v=YlGqN3AKOsA',
  'http://www.youtube.com/watch?v=YlGqN3AKOsA&app=desktop': 'http://www.youtube.com/watch?v=YlGqN3AKOsA',
  'http://www.youtube.com/watch?v=YlGqN3AKOsA&feature=kp&app=desktop': 'http://www.youtube.com/watch?v=YlGqN3AKOsA',
  'http://www.youtube.com/watch?app=desktop&v=YlGqN3AKOsA': 'http://www.youtube.com/watch?v=YlGqN3AKOsA',
  'http://www.youtube.com/watch?v=YlGqN3AKOsA&ac=': 'http://www.youtube.com/watch?v=YlGqN3AKOsA',
  'http://www.youtube.com/watch?v=YlGqN3AKOsA&ac=test': 'http://www.youtube.com/watch?v=YlGqN3AKOsA',
  'http://www.youtube.com/watch?ac=&v=YlGqN3AKOsA': 'http://www.youtube.com/watch?v=YlGqN3AKOsA',
  'http://www.youtube.com/watch?v=YlGqN3AKOsA&ac=&app=desktop': 'http://www.youtube.com/watch?v=YlGqN3AKOsA',
}

function runTests() {
  for (var input in TEST_DATA) {
	assertEquals(TEST_DATA[input], getStrippedUrl(input));
  }
}

window.addEventListener('load', runTests, false);