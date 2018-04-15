function sum() {
  let result = 0;
  for (let i = 0; i < arguments.length; i++) {
    result += arguments[i]
  }
  return result;
}

function mul() {
  let result = 1;
  
  if (arguments.length == 0) {
    return "Числа не введены"
  }
  
  for (let i = 0; i < arguments.length; i++) {
    result *= arguments[i]
  }
  return result;
}


function applyAll(func) {
  var newArr = [arguments].slice.call(arguments,1);
  return func.apply(this, newArr);
 }

console.log(applyAll(mul,5,5))
