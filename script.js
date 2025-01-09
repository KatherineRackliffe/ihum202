// Include jQuery
// https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
let letterCount = 0;
const el = $("#loading");
const word = el.html().trim();
let finished = false;

el.html(""); // Clear the content of the element
for (let i = 0; i < word.length; i++) {
  el.append(`<span>${word.charAt(i)}</span>`);
}

setTimeout(write, 75);
let incrementer = setTimeout(inc, 1000);

function write() {
  for (let i = letterCount; i < word.length; i++) {
    const randomChar = Math.floor(Math.random() * alphabet.length);
    $("span").eq(i).text(alphabet[randomChar]);
  }
  if (!finished) {
    setTimeout(write, 75);
  }
}

function inc() {
  $("span").eq(letterCount).text(word[letterCount]).addClass("glow");
  letterCount++;
  if (letterCount >= word.length) {
    finished = true;
    setTimeout(reset, 1500);
  } else {
    setTimeout(inc, 1000);
  }
}

function reset() {
  letterCount = 0;
  finished = false;
  $("span").removeClass("glow");
  setTimeout(inc, 1000);
  setTimeout(write, 75);
}
