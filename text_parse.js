var lineCounter = 0;
var startBound = $('<div/>').addClass('bound start-bound').text('start');
var endBound = $('<div/>').addClass('bound end-bound').text('end');

var parseText = function(input, output) {
  output.bind('mouseup', function() {
    console.log(new Date());
    var selection;
    if (window.getSelection) {
      selection = window.getSelection();
    } else if (document.selection) {
      selection = document.selection.createRange();
    }
    if (selection.toString() !== '') {
      startBound.detach();
      endBound.detach();
      var elements = [
        $(selection.anchorNode.parentElement.parentElement.parentElement),
        $(selection.focusNode.parentElement.parentElement.parentElement),
      ];
      elements.sort(function(a, b) { return b.data('number')-a.data('number')});
      elements.pop().before(startBound);
      elements.pop().after(endBound);
      //$(selection.anchorNode.parentElement.parentElement.parentElement).before(startBound);
      //$(selection.focusNode.parentElement.parentElement.parentElement).after(endBound);
      selection.empty();
      //window.selection = selection;
    }
  });
  window.input = input;
  output.html('');
  var lines = input.split(/\n/);
  window.lines = lines;
  var ch_num = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
  var h1i = 0;
  var h2i;
  $.each(lines, function(i, line) {
    var h1pattern = '^' + ch_num[h1i] + '、.*';
    var h2pattern = '[(（]' + ch_num[h2i] + '[)）].*';
    if (line.match(/^\s+主\s*文\s*$/)) {
      renderLine(output, 'header-main', line);
    } else if (line.match(h1pattern)) {
      renderLine(output, 'header1', line);
      h1i++;
      h2i = 0;
    } else if (line.match(h2pattern)) {
      renderLine(output, 'header2', line);
      h2i++;
    } else if (line.match(/^\s{4}[^\s].*/)) {
      renderLine(output, 'content-s4', line);
    } else if (line.match(/^\s{6}[^\s].*/)) {
      renderLine(output, 'content-s6', line);
    } else {
      renderLine(output, '', line);
    }
  });
}

var renderLine = function(output, type, line) {
  var div = $('<div></div>').addClass('line').data('number', ++lineCounter);
  var label = $('<label></label>');
  var cb = $('<input/>').attr('type', 'checkbox').addClass('cb');
  var text = $('<span></span>').addClass(type).text(line);
  label.append(cb);
  label.append(text);
  div.append(label);
  output.append(div);
}
