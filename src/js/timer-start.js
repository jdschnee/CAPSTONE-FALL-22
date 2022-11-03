const startBtn = document.querySelector("#start");
const pauseBtn = document.querySelector("#pause");
const duration = document.querySelector("#duration");
const circle = document.querySelector("circle");

const perimeter = circle.getAttribute('r') * 2 * Math.PI;
circle.setAttribute('stroke-dasharray', perimeter);

let currentOffset;
let decrement;

const timer = new Timer(startBtn, pauseBtn, duration, {
  onStart() {
    // console.log('Timer Started')
    currentOffset = 0;
    circle.setAttribute('stroke', '#0bdf24');
    decrement = perimeter / (duration.value / .01);
    currentOffset -= decrement;
  },
  onTick() {
    // console.log('Timer Ticked')
    circle.setAttribute('stroke-dashoffset', currentOffset);
    currentOffset -= decrement;
  },
  onComplete() {
    circle.setAttribute('stroke', 'red');
    circle.setAttribute('stroke-dashoffset', 0);
    // console.log('Timer Completed');

    localStorage.setItem('mostRecentScore', score);
    setTimeout(() => window.location.href="/quiz-complete.html",
    2000)
  }
});
   