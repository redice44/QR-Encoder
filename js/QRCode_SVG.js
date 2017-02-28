var addBox = function (qrDom, x, y) {
  var width = 10;
  var height = 10;

  var box = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  box.setAttribute('x', x);
  box.setAttribute('y', y);
  box.setAttribute('width', width);
  box.setAttribute('height', height);

  qrDom.appendChild(box);
}
