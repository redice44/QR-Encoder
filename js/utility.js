var base10tobase2 = function(num) {
  var result = '';
  var bit = '';

  while (num > 0) {
    bit = num % 2;
    num = Math.floor(num / 2);
    result = bit + result;
  }

  return result;
};

var padLeftBits = function(num, str) {
  return '0'.repeat(num) + str;
};

var padRightBits = function(num, str) {
  return str +'0'.repeat(num);
};
