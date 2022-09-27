function pause() {
  let video = document.getElementById("tutorial-video-1")
  video.contentWindow.postMessage('{"event":"command", "func":"pauseVideo", "args":""}', '*');
}
let video = document.getElementById("tutorial-video-1")
tutorialBox = document.querySelector(".tutorial-box");

// tutorialBoxes.forEach(tutorialBox => {
//   tutorialBox.addEventListener("mouseout", function(){
//   // getting every iframe from the body
//   var iframes = document.querySelectorAll('iframe');
//   // reinitializing the values of the src attribute of every iframe to stop the YouTube video.
//   for (let i = 0; i < iframes.length; i++) {
//     if (iframes[i] !== null) {
//       var temp = iframes[i].src;
//       iframes[i].src = temp;
//     }
//   }
// })
// });

tutorialBox.addEventListener('mouseout', (event) => {
  // pause();
  stopVideo();

})

function stopVideo() {
  // getting every iframe from the body
  var iframes = document.querySelectorAll('iframe');
  // reinitializing the values of the src attribute of every iframe to stop the YouTube video.
  for (let i = 0; i < iframes.length; i++) {
    if (iframes[i] !== null) {
      var temp = iframes[i].src;
      iframes[i].src = temp;
    }
  }
};