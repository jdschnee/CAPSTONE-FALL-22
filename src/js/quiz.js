calcBtn = document.querySelector(".btn--calculator");

calcBtn.addEventListener('click', (event) => {
  const calcSection = document.querySelector("#calculator-section")
  let quizSection = document.querySelector(".quiz-section");

  if (quizSection) {
    quizSection.remove();
  }
  quizSection = document.createElement("section")
  quizSection.classList.add("quiz-section");
  calcSection.insertAdjacentElement('beforeend', quizSection);
  const divQuestion = document.createElement("div");
  divQuestion.innerText = "What is the correct run-time complexity?";
  divQuestion.classList.add("question", "tutorial-heading");
  quizSection.insertAdjacentElement('beforeend', divQuestion);

  let prefixes = ['A', 'B', 'C', 'D']

  for (let index = 0; index < 4; index++) {
    let choiceContainer = document.createElement("div");
    choiceContainer.classList.add("choice-container", "btn", "btn--white", "btn--animated", "btn--calculator");

    let choicePrefix = document.createElement("p");
    choicePrefix.classList.add("choice-prefix");
    choicePrefix.innerText = prefixes[index];

    let choiceText = document.createElement("p");
    choiceText.classList.add("choice-text");
    choiceText.dataset.number = index;
    choiceText.innerHTML = toSup(resultSet[index]);

    let choiceIcon = document.createElement("i");
    // choiceText.classList.add("choice-text");
    // choiceText.dataset.number = index;
    // choiceText.innerText = resultSet[index];

    quizSection.insertAdjacentElement('beforeend', choiceContainer);
    choiceContainer.insertAdjacentElement('beforeend', choicePrefix);
    choiceContainer.insertAdjacentElement('beforeend', choiceText);
    choiceContainer.insertAdjacentElement('beforeend', choiceIcon);
  }

  let choiceContainers = document.querySelectorAll(".choice-container");

  choiceContainers.forEach(choiceBox => {
    choiceBox.addEventListener('click', (event) => {
      let choice = choiceBox.querySelector('[data-number]');
      let icon = choiceBox.querySelector("i");
      let answer = choiceBox.querySelector(".choice-text");

      if (choice.innerText == result) {
        icon.classList.add("icon-basic-cup", "choice-icon");
        choiceBox.style.backgroundColor = 'rgba(0,255,0,.9)';
        choiceBox.style.borderColor = 'black';
        choice.style.borderColor = 'black'
        choiceBox.style.color = 'black';
        
        //added for testing
        // icon.classList.add("confetti-button");

        icon.addEventListener('click', (event) => {
          for (const answer of choiceContainers) {
            answer.remove();
          }

          divQuestion.innerText = "Congrats, you found the correct answer!";
        });
      } else {
        icon.classList.add("icon-basic-trashcan", "choice-icon");
        choiceBox.style.backgroundColor = 'rgba(255,0,0,.9)';
        choiceBox.style.borderColor = 'black';
        choice.style.borderColor = 'black'
        choiceBox.style.color = 'black';
        answer.style.textDecoration = 'line-through'

        icon.addEventListener('click', (event) => {
          choiceBox.remove();
        });
      }

    });
  });



})

function toSup(str) {
  idx = str.indexOf("^");
  if (idx === -1) {
    return str;
  }
  str = [...str];
  str.splice(idx, 2, str[idx+1].sup());
  return str.join("");
}


