var maths = {
   number: 4,
   result: result = this.number,
   sum: function() {
       this.result = this.number + this.number
       return this;
   },
   minus: function() {
       this.result = this.result - this.number
       return this;
   },
   mul: function() {
       this.result = this.result * this.number
       return this;
   },
   showResult: function() {
       alert(this.result)
       return this;
   }
};

maths.sum().sum().minus().multiplay().showResult();