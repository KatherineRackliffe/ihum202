// Include jQuery (already referenced in the original code comment)
// Ensure this script runs after the DOM is fully loaded

$(document).ready(function () {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
    let letterCount = 0;
    const el = $("#loading");
    const word = el.text().trim();
    let finished = false;
  
    el.html("");
  
    // Wrap each character in a span
    for (let i = 0; i < word.length; i++) {
      el.append(`<span>${word.charAt(i)}</span>`);
    }
  
    // Start the write and increment processes
    setTimeout(write, 75);
    let incrementer = setTimeout(inc, 1000);
  
    function write() {
      if (!finished) {
        for (let i = letterCount; i < word.length; i++) {
          const randomChar = alphabet[Math.floor(Math.random() * alphabet.length)];
          el.find("span").eq(i).text(randomChar);
        }
        setTimeout(write, 75);
      }
    }
  
    function inc() {
      if (letterCount < word.length) {
        el.find("span").eq(letterCount).text(word[letterCount]).addClass("glow");
        letterCount++;
        setTimeout(inc, 1000);
      } else {
        finished = true;
        setTimeout(reset, 1500);
      }
    }
  
    function reset() {
      letterCount = 0;
      finished = false;
      el.find("span").removeClass("glow");
      setTimeout(inc, 1000);
      setTimeout(write, 75);
    }
  });
  