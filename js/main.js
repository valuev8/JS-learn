const maxProp = function(obj) { //Calculates max value of the object property
  var max = 0;
  var maxProp;
  for (var name in obj) {
    if (max < obj[name]) {
      max = obj[name];
      maxProp = name;
    }
  }
  return maxProp;
}

let studentsList = [
  {
  name: "Student",
  start: 2010,
  end: 2015
  },
  {
  name: "Student",
  start: 2015,
  end: 2016
  },
  {
  name: "Student",
  start: 2012,
  end: 2016
  },
]


var getMaxYear = function(start,end) {
  let result = {};
  for (let j = start; j <= end; j++) {
    result[j] = 0;
    for (let i = 0; i < studentsList.length; i++) {
      if (studentsList[i].start <= j && studentsList[i].end >= j) {
        result[j] += 1;
      }
    }
  } 
  if (maxProp(result) == 0) {
    return "Nobody studied at these years"
  }
  return `Maximum numbers of students studied in ${maxProp(result)}`;
}

console.log(getMaxYear(2000,2020))
