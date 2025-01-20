// meal class
class Meal {
  constructor(time, comps, kcal) {
    this.date = Date;
    this.time = time;
    this.comps = comps;
    this.kcal = kcal;
  }
}

//exercise class

// UI class
class UI {
  static displayMeals() {
    const storedMeals = [
      {
        date: '20/01/2025',
        time: 2,
        comps: 'banana',
        kcal: 100,
      },
      {
        date: '19/01/2025',
        time: 2,
        comps: 'banana',
        kcal: 100,
      },
      {
        date: '21/01/2025',
        time: 2,
        comps: 'banana',
        kcal: 100,
      },
    ];

    const meals = storedMeals;

    meals.forEach((meal) => UI.addMealToList(meal));
  }

  static addMealToList(meal) {
    const list = document.querySelector('#meal-list');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${meal.time}</td>
        <td>${meal.comps}</td>
        <td>${meal.kcal}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

    list.appendChild(row);
  }
}

//store class

//event: display
document.addEventListener('DOMContentLoaded', UI.displayMeals);

//event:add
document.querySelector('#meal-form').addEventListener('submit', (e) => {
  e.preventDefault();
  //get form value
  const time = document.querySelector('#meal-time').value;
  const comps = document.querySelector('#meal-components').value;
  const kcals = document.querySelector('#meal-calories').value;

  //instantiate
  const meal = new Meal(time, comps, kcals);

  console.log(meal);
});
//event:REMOVE
