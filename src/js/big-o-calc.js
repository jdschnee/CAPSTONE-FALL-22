/**
 * The calculate button. Retrieves the code from the code box and processes it when clicked.
 */
var getBigOBtn = document.getElementById("calculate-btn");
getBigOBtn.onclick = function() {
    var codeInput = document.getElementById("editor")
    var code = codeInput.value.trim();

    processUserCode(code);
}

/**
 * Big O API parses the code and returns the Big-O complexity. A multiple choice question is generated
 * with the correct answer being the calculated Big-O complexity.
 * @param {*} code - The code entered in the code box
 */
function processUserCode(code) {
    let url = 'https://rl43w8txr4.execute-api.us-east-1.amazonaws.com/getBigO'
    const data = { "code": code }
    
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
    .then(data => {return data.json()})
    .then(result => { 
      let unsupported = result.unsupported;
      highlight(unsupported);

      if (result.result !== undefined) {
        createQuiz(result.result);
      } else {
        // createQuiz("Invalid Syntax");
        const calcSection = document.querySelector("#calculator-section")
        let quizSection = document.querySelector(".quiz-section");

        if (quizSection) {
          quizSection.remove();
        }
        quizSection = document.createElement("section")
        quizSection.classList.add("quiz-section");
        calcSection.insertAdjacentElement('beforeend', quizSection);
        const divQuestion = document.createElement("div");
        divQuestion.innerText = "Invalid Syntax: Please re-enter a valid code snippet";
        divQuestion.classList.add("question", "tutorial-heading", "invalid-syntax");
        quizSection.insertAdjacentElement('beforeend', divQuestion);
      }

    })

}

/**
 * Creates a multiple-choice question based on the result of the Big-O complexity calculation
 * @param {*} result - The result of the Big-O complexity calculation
 */
function createQuiz(result) {
  let bigOValues = ["O(1)", "O(N)", "O(N^2)", "O(N^3)", "O(log(N))", "O(Nlog(N))", "O(N^2log(N))", "None of the answers are correct"];
  let newValue = bigOValues.filter(x => x != result);

  let quizArr = []
  for (let i = 0; i < 4; i++) {
    quizArr.push("");
  }

    let randomIndex = Math.floor(Math.random() * 4);
    quizArr[randomIndex] = result;
    let arr = shuffle(newValue);
    for(let i = 0; i < 4; i++)
    {
        if(quizArr[i] != result)
        {
            quizArr[i] = arr[i]
        }
    }
    showQuiz(quizArr, result);
}

/**
 * Randomly orders the multiple-choice answers
 * @param {*} array - The multiple choice answers
 * @returns - the array in random order
 */
function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

/**
 * Highlights any bits of code that are not supported by the API
 * @param {*} unsupported - The array of objects that contain index for the start and end of the unsupported section
 */
function highlight(unsupported) {
  let highlights = document.querySelector('.highlights');
  let editor = document.getElementById("editor");
  let code = editor.value;
  code = code.trim();
  editor.value = code;
  
  let insertions = [];
  for(let i in unsupported)
  {
    insertions.push({location: unsupported[i].start, val: "<mark>"});
    insertions.push({location: unsupported[i].end + 1, val: "</mark>"});
  }
  insertions.sort(function(a, b) {
    return b.location - a.location;
  });
  for(let i in insertions)
  {
    code = code.substring(0, insertions[i].location) + insertions[i].val + code.substring(insertions[i].location);
  }
  code = code.replace(/\n/g, "<br>");
  highlights.innerHTML = code;
}