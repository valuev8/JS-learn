var complexFunction = function(arg1, arg2) { 
    return arg1 + arg2;
 };

function cache (func) {
	let storage = {};
  let key;
	return function () {
    let firstArg = arguments[0];
    let secondArg = arguments[1];
    let key = `${firstArg}` + `${secondArg}`;
    let key2 = `${secondArg}` + `${firstArg}`;
		
    if (key in storage || key2 in storage) {
      console.log("Found in cache");
      return storage[key];
    } else {
      console.log("Calculating...");
      let result = func(firstArg,secondArg);
      storage[key] = result;
      storage[key2] = result;
      return result;
    }
  }
}

var newFunc = cache(complexFunction);
console.log(newFunc('foo','bar'))
console.log(newFunc('foo','bar'))
console.log(newFunc(100,1))
console.log(newFunc(1,100))
