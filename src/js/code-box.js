let htmlTemplateStr = `for(int i = 0; i < n; i++){

}`;

let codeEditor = document.getElementById('codeEditor');
let lineCounter = document.getElementById('lineCounter');

let lineCountCache = 0;
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

codeEditor.addEventListener('scroll', () => {
	lineCounter.scrollTop = codeEditor.scrollTop;
	lineCounter.scrollLeft = codeEditor.scrollLeft;
});

codeEditor.addEventListener('input', () => {
	line_counter();
});

codeEditor.addEventListener('keydown', (e) => {
	let { keyCode } = e;
	let { value, selectionStart, selectionEnd } = codeEditor;

	if (keyCode === 9) {
		// TAB = 9
		e.preventDefault();
		codeEditor.value = value.slice(0, selectionStart) + '\t' + value.slice(selectionEnd);
		codeEditor.setSelectionRange(selectionStart + 2, selectionStart + 2);
	}
});

codeEditor.value = htmlTemplateStr;
line_counter();
