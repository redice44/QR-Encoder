var init = function() {
  var w = 10;
  var h = 10;
  var c = 20;
  var r = 20;
  var qrDom = document.getElementById('qr');
  var data = AlphaNumericEncoder('hello world', 'Q');
  console.log(data);
  data = data.split('');
  data.forEach(function(d, i) {
    if (d === '1') {
      addBox(qrDom, i%c * w, Math.floor(i/r) * h);
    }
  });
}

init();