function tickets(line) {
  let i;
  let j;
  let cash = [0]; //Касса записывается в виде массива, чтобы разбить деньги по отдельным купюрам.
  const price = 25;
  let change;
  
  for (i=0; i < line.length; i++) {
    if (line[i] - price === 0) { //Если сдачи не надо, сразу записывает в Сash
      cash[i] = line[i];
    } else {
      change = line[i] - price; //Если сдачa надо, считаем сколько нужно отдать
      for (j = 0; j < cash.length; j++) { // создаем цикл чтобы отдавать каждую купюру пока сумма сдачи не будет равна нулю
        if (change > 0 && change >= cash[j]) { 
          change = change - cash[j];
          cash [j] = 0; //Обнуляем купюру так как мы ее отдали.
        }
        if (change === 0) {  //Если сдачу отдали полностью, записываем какую купюру мы получили.
          cash[i] = line[i]; 
        }
      }
      if (change > 0) { // Если всю сдачу не отдали, а денег больше нет, то простите
        return `NO, Vasya will not have enough money to give change to ${line[i]} dollars`;
      }
    }
  }
  return "YES" 
}

console.log(tickets([25,50,50]));
