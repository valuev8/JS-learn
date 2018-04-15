function timerFirst() {
  let i = 1;
  let timerId = setTimeout(function count() {
    console.log(i);
    ++i;
    if (i == 11) {
      return;
    }
    timerId = setTimeout(count, 100)
  }, 100)  
}

function timerSecond() { 
  let i = 1;
  let timerId = setInterval(function() {
  console.log(i);
  i++;
  if (i == 11) {
      clearTimeout(timerId);
   }
  }, 100);
}

timerFirst()
timerSecond()