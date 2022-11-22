const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
  {
    question: "What is the correct run-time complexity?",
    snippet: `public boolean containsNumber(List<Integer> numbers, int comparisonNumber) {
  for(Integer number : numbers) {
    if(number == comparisonNumber) {
      return true;
    }
  }
  return false;
}`,
    choiceArr: ['O(1)', 'O(N)', 'O(NlogN)', 'None of the answers are correct'],
    answer: 'O(N)',
  },
  {
    question: "What is the correct run-time complexity?",
    snippet: `static int search(int arr[], int size, int key)
{
	if (size == 0) {
		return -1;
	}
	else if (arr[size - 1] == key) {
		// Return the index of found key.
		return size - 1;
	}
	else {
		return search(arr, size - 1, key);
	}
}`,
    choiceArr: ['O(N^2)', 'O(N)', 'O(1)', 'None of the answers are correct'],
    answer: 'O(N)',
  },
  {
    question: 'What is the correct run-time complexity?',
    snippet: `for(int i = 0; i < n; i++){

}`,
    choiceArr: ['O(N)', 'O(logN)', 'O(N^2)', 'O(N^3)'],
    answer: 'O(N)',
  },
  {
    question: "What is the correct run-time complexity?",
    snippet: `System.out.println("Hello World!");`,
    choiceArr: ['O(1)', 'O(N)', 'O(NlogN)', 'None of the answers are correct'],
    answer: 'O(1)',
  },
  {
    question: "What is the correct run-time complexity?",
    snippet: `for(int i = 0; i < 10; i++)
{
	System.out.println("i = " + i);
}`,
    choiceArr: ['O(1)', 'O(N)', 'O(NlogN)', 'None of the answers are correct'],
    answer: 'O(1)',
  },
  {
    question: "What is the correct run-time complexity?",
    snippet: `for(int i = 0; i < 10; i++)
{
	for(int j = 0; j < 100; j++)
	{
		System.out.println("Hello World");
	}
}`,
    choiceArr: ['O(1)', 'O(N^2)', 'O(NlogN)', 'None of the answers are correct'],
    answer: 'O(1)',
  },
  {
    question: "What is the correct run-time complexity?",
    snippet: `for(int i = 0; i < n; i++)
{
	for(int j = 0; j < n; j++)
	{
		System.out.println("Hello World");
	}
}`,
    choiceArr: ['O(N^2)', 'O(N)', 'O(NlogN)', 'None of the answers are correct'],
    answer: 'O(N^2)',
  },
  {
    question: "What's the run-time complexity for the following sorting method?",
    snippet: `sort(int array[]) {
  int size = array.length;
    
  // loop to access each array element
  for (int i = 0; i < size - 1; i++)
    
    // loop to compare array elements
    for (int j = 0; j < size - i - 1; j++)

      // compare two adjacent elements
      // change > to < to sort in descending order
      if (array[j] > array[j + 1]) {

        // swapping occurs if elements
        // are not in the intended order
        int temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }`,
    choiceArr: ['O(N^2)', 'O(N)', 'O(NlogN)', 'O(N^3)'],
    answer: 'O(N^2)',
  },
  {
    question: "What is the correct run-time complexity?",
    snippet: `for (int i = 1; i < n; i = i * 2){
  System.out.println("Hey - I'm busy looking at: " + i);
}`,
    choiceArr: ['O(logN)', 'O(N^2)', 'O(N)', 'O(NlogN)'],
    answer: 'O(logN)',
  },
  {
    question: "What is the correct run-time complexity?",
    snippet: `public boolean containsNumber(List<Integer> numbers, int comparisonNumber) {
  int low = 0;
  int high = numbers.size() - 1;
  while (low <= high) {
    int middle = low + (high - low) / 2;
    if (comparisonNumber < numbers.get(middle)) {
      high = middle - 1;
    } else if (comparisonNumber > numbers.get(middle)) {
      low = middle + 1;
    } else {
      return true;
    }
  }
  return false;
}`,
    choiceArr: ['O(logN)', 'O(N)', 'O(NlogN)', 'None of the answers are correct'],
    answer: 'O(logN)',
  },
  {
    question: "What is the correct run-time complexity?",
    snippet: `for (int i = 1; i <= n; i++){
    for(int j = 1; j < n; j = j * 2) {
        System.out.println("Hey - I'm busy looking at: " + i + " and " + j);
    }
}`,
    choiceArr: ['O(logN)', 'O(N)', 'O(NlogN)', 'None of the answers are correct'],
    answer: 'O(NlogN)',
  }
]

const POINTS_PER_Q = 25
const TOTAL_QUESTIONS = 4

startGame = () => {
  questionCounter = 0
  score = 0
  availableQuestions = [...questions]
  getNewQuestion()
}

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= TOTAL_QUESTIONS){
    localStorage.setItem('mostRecentScore', score)

    return window.location.assign('/quiz-complete.html')
  }

  questionCounter++
  progressText.innerText = `Question ${questionCounter} of ${TOTAL_QUESTIONS}`
  progressBarFull.style.width = `${(questionCounter / TOTAL_QUESTIONS) * 100}%`

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
  currentQuestion = availableQuestions[questionsIndex]
  question.innerText = currentQuestion.question

  // add code for inserting snippet into text area
  let codeEditor = document.querySelector('textarea');
  codeEditor.value = currentQuestion.snippet;

  currentQuestion.choiceArr = shuffle(currentQuestion.choiceArr);
  choices.forEach(choice => {
    const number = choice.dataset['number']
    console.log("******"+ number)
    // choice.innerText = currentQuestion['choice' + number]
    choice.innerHTML = toSup(currentQuestion.choiceArr[number-1]);
  })

  console.log("$$$$" + availableQuestions);
  availableQuestions.splice(questionsIndex, 1)
  console.log("$$$$" + availableQuestions);

  acceptingAnswers = true
}

choices.forEach(choice => {
  choice.addEventListener('click', e => {
    if (!acceptingAnswers) return

    acceptingAnswers = false
    const selectedChoice = e.target
    // const selectedAnswer = selectedChoice.dataset['number']
    const selectedAnswer = selectedChoice.innerHTML;
    console.log(selectedAnswer)

    let classToApply = selectedAnswer == toSup(currentQuestion.answer) ? 'correct' : 'incorrect'

    if (classToApply === 'correct') {
      incrementScore(POINTS_PER_Q)
    }

    selectedChoice.parentElement.classList.add(classToApply)

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply)
      getNewQuestion()

    }, 500)
  })
})

incrementScore = num => {
  score += num
  scoreText.innerText = score
}

startGame()