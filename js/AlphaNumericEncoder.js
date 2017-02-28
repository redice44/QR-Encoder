var AlphaNumericEncoder = function(str, ecLevel) {
  var modeIndicator = '0010';
  var countIndicator = base10tobase2(str.length);
  var encodedData = '';
  var qrVersion = 1;
  var data;
  var bytes = [];
  var numCodeWords = 13; // Currently from chart
  var bitLength = 13 * 8;

  var i = 0;
  // The pad length depends on the Version #
  // Break Points: Version 1-9: 9
  // Version 10-26: 11
  // Version 27-40: 13
  if (countIndicator.length < 9) {
    countIndicator = padLeftBits(9 - countIndicator.length, countIndicator);
  }

  encodedData = alphaNumbericTransform(str);

  // calculateVersion from the encodedData Length and ecLevel

  data = modeIndicator + countIndicator + encodedData;

  for (i = 0; i < data.length; i += 8) {
    bytes.push(data.substr(i, 8));
  }

  if (data.length < bitLength) {
    bytes[bytes.length - 1] = padRightBits(8 - bytes[bytes.length - 1].length, bytes[bytes.length - 1]);
  }

  i = 0;

  while (numCodeWords > bytes.length) {
    if (i % 2 === 0) {
      bytes.push('11101100');
    } else {
      bytes.push('00010001');
    }
    i++;
  }

  return bytes.join('');
};

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
    '0' : 0,
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