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

function toSup(str) {
  idx = str.indexOf("^");
  if (idx === -1) {
    return str;
  }
  str = [...str];
  str.splice(idx, 2, str[idx+1].sup());
  return str.join("");
}