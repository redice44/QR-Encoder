

var alphaNumbericTransform = function(str) {
  str = str.toUpperCase();
  var pairs = makePairs(str);
  var data = '';

  pairs.forEach(function(pair) {
    data += base10tobase2(evaluatePair(pair));
  });

  return data;
}

var makePairs = function(str) {
  // Two letter pairs in an array.
  var pairs = [];
  var index = 0;
  while (index < str.length) {
    pairs.push(str.slice(index, index+2));
    index += 2;
  }

  return pairs;
}

var evaluatePair = function(str) {
  // First Char * 45 + second char
  var result = evaluateChar(str[0]) * 45;
  if (str[1]) {
    result += evaluateChar(str[1]);
  }

  return result;
}

var evaluateChar = function(str) {
  var values = {
    '0': 0,
    '1': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    'A': 10,
    'B': 11,
    'C': 12,
    'D': 13,
    'E': 14,
    'F': 15,
    'G': 16,
    'H': 17,
    'I': 18,
    'J': 19,
    'K': 20,
    'L': 21,
    'M': 22,
    'N': 23,
    'O': 24,
    'P': 25,
    'Q': 26,
    'R': 27,
    'S': 28,
    'T': 29,
    'U': 30,
    'V': 31,
    'W': 32,
    'X': 33,
    'Y': 34,
    'Z': 35,
    ' ': 36,
    '$': 37,
    '%': 38,
    '*': 39,
    '+': 40,
    '-': 41,
    '.': 42,
    '/': 43,
    ':': 44
  };

  return values[str];
}

var base10tobase2 = function(num) {
  // Must be 11 bit. Pad left with 0s
  var result = '';
  var bit = '';

  while (num > 0) {
    bit = num % 2;
    num = Math.floor(num / 2);
    result = bit + result;
  }
  if (result.length < 11) {
    result = '0'.repeat(11 - result.length) + result;
  } 

  return result;
}

var fun = function() {
  var qrDom = document.getElementById('qr');
  var data = alphaNumbericTransform('hello world');
  console.log(data);
  data = data.split('');
  data.forEach(function(d, i) {
    if (d === '1') {
      addBox(qrDom, i%10 * 10, Math.floor(i/10) * 10);
    }
  });
}

fun();