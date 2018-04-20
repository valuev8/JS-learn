var maths = function (number) {
  var result;
  const x = number;
  return {
    sum: function() {
       result = number += x;
       return this;
   },
   minus: function() {
       result = number -= x;
       return this;
   },
   mul: function() {
       result = number *= x;
       return this;
   },
   showResult: function() {
       return result;
   }
  };
}

console.log(maths(4).sum().sum().sum().minus().mul().showResult())
