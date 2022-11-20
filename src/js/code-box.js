let codeEditor = document.querySelector('.code-editor');
let lineCounter = document.querySelector('.line-counter');

let lineCountCache = 0;

/**
 * Updates the line count on the side of the code box
 */
function line_counter() {
	let lineCount = codeEditor.value.split('\n').length;
	let outarr = new Array();
	if (lineCountCache != lineCount) {
		for (var x = 0; x < lineCount; x++) {
			outarr[x] = x + 1 + '.';
		}
		lineCounter.value = outarr.join('\n');
	}
	lineCountCache = lineCount;
}

lineCounter.addEventListener('click', () => {
	document.getElementById('editor').focus();
});

codeEditor.addEventListener('scroll', () => {
	lineCounter.scrollTop = codeEditor.scrollTop;
	lineCounter.scrollLeft = codeEditor.scrollLeft;
});

codeEditor.addEventListener('input', () => {
	line_counter();
});

// add capability to tab in codeEditor
codeEditor.addEventListener('keydown', function(e) {
  if (e.key == 'Tab') {
    e.preventDefault();
    var start = this.selectionStart;
    var end = this.selectionEnd;
    this.value = this.value.substring(0, start) +
      "\t" + this.value.substring(end);
    this.selectionStart =
      this.selectionEnd = start + 1;
  }
});

line_counter();