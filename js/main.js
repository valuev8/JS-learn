function fibonacci(n) {
  let a = 0;
  let b = 1;
  let result = 1;
  for (var i = 2; i <= n; i++) {
    result = a + b;
    a = b;
    b = result;
  }
  return result;
}

console.log(fibonacci(6))