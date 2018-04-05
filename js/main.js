function cookrecipe(recipe, available) {
  return (calcAmount(recipe, findCommonKeys(recipe,available)));
}

function findCommonKeys(recipe,available) { // Находит в объекте 'available' совпадающие с объектом 'recipe' ключи и создает новый объект только с нужными для рецепта ключами.
  let obj = {};
  for (let key in recipe) {
    for (let key2 in available) {
      if (key == key2) {
        obj[key] = available[key2];
      }
    }
  }
  if (Object.keys(obj).length < Object.keys(recipe).length) { // если ключей в 'recipe' больше, чем в 'available' обнуляет ключи, чтобы следующая функция не выводила 'undefined'. (Не хватает ингредиентов)
    for (let key in obj) {
      obj[key] = 0;
    }
  }
  return obj;
}

function calcAmount(recipe, available) { // Считает сколько значений каждого ключа Recipe есть в значении того же ключа "available". Выводит максимально сколько можем сделать 'Recipe' из того что есть.
  let key;
  let result;
  
  for(key in available) {
    let counter = result; 
    for (key in recipe) {
      if (available[key] < recipe[key]) {
        return 0;
      }
      result = available[key] / recipe[key] | 0;
      if (counter < result) {
        result = counter;
      }
    }
  }
  return result;
}

console.log(cookrecipe({Apples: 3, flour: 300, sugar: 150, milk: 100, oil: 100}, {sugar: 500, flour: 2000, milk: 2000}))



