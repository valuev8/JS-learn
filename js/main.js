let studentsList = [
  {
  name: "Ivan Petrovich",
  start: 2000,
  end: 2005
  },
  {
  name: "Elon Musk",
  start: 2015,
  end: 2019
  },
  {
  name: "Steve Jobs",
  start: 2015,
  end: 2019
  },
  {
  name: "Petro Poroshenko",
  start: 2016,
  end: 2020
  },
  {
  name: "Donald Trump",
  start: 2010,
  end: 2015
  },
  {
  name: "Elton John",
  start: 2000,
  end: 2005
  },
  {
  name: "Anton Valuiev",
  start: 2015,
  end: 2019
  },
  {
  name: "Elizabeth II",
  start: 1930,
  end: 1935
  },
]

var calcStudents = function(start,end) {
  let result = [];
  for (let i = 0; i < studentsList.length; i++) {
    if (studentsList[i].start == start && studentsList[i].end == end) {
      result.push(studentsList[i].name);
    }
  }
  
  if (result[0] === undefined) {
    result = "Nobody";
  }
  
  return result;
}

console.log(calcStudents(2015, 2019))
