// meal class
class Meal {
  constructor(time, comps, kcal) {
    this.id = Date.now();
    let d = new Date();
    this.date = Intl.DateTimeFormat('en-GB').format(d);
    this.time = time;
    this.comps = comps;
    this.kcal = kcal;
  }
}

//exercise class

// UI class
class UI {
  static displayMeals() {
    const meals = Store.getMeals();

    meals.forEach((meal) => UI.addMealToList(meal));
  }

  static addMealToList(meal) {
    const list = document.querySelector('#meal-list');
    const row = document.createElement('tr');

    row.setAttribute('data-id', meal.id);
    row.innerHTML = `
        <td>${meal.time}</td>
        <td>${meal.comps}</td>
        <td>${meal.kcal}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

    list.appendChild(row);
  }
  static deleteMeal(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
      UI.showAlert('NIGGA', 'success');
    }
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#meal-form');
    container.insertBefore(div, form);
    //vanish in spec time
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

  static clearFields() {
    document.querySelector('#meal-time').value = '';
    document.querySelector('#meal-components').value = '';
    document.querySelector('#meal-calories').value = '';
  }
}

//store class
class Store {
  static getMeals() {
    let meals;
    if (localStorage.getItem('meals') === null) {
      meals = [];
    } else {
      meals = JSON.parse(localStorage.getItem('meals'));
    }
    return meals;
  }

  static addMeal(meal) {
    const meals = Store.getMeals();

    meals.push(meal);

    localStorage.setItem('meals', JSON.stringify(meals));
  }

  static removeMeal(id) {
    const meals = Store.getMeals();

    meals.forEach((meal, index) => {
      if (meal.id == id) {
        meals.splice(index, 1);
      }
    });

    localStorage.setItem('meals', JSON.stringify(meals));
  }
}
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
  // add meal to UI
  UI.addMealToList(meal);
  //add meal to store
  Store.addMeal(meal);
  //show nigga msg
  UI.showAlert('NIGGA', 'success');
  //clear fields
  UI.clearFields();
});
//event:REMOVE
document.querySelector('#meal-list').addEventListener('click', (e) => {
  UI.deleteMeal(e.target); //from UI
  let id = e.target.parentElement.parentElement.getAttribute('data-id');
  Store.removeMeal(id); //from store
});
//tasks: background picture for meals and training
//navbar
// sort by date
//total kcal and volume
//exercise tab (show,hide)
