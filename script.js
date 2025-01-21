// meal class
class Meal {
  constructor(time, comps, kcal) {
    this.id = Date.now();
    const d = new Date();
    this.date = d.toLocaleDateString('en-CA');
    this.time = time;
    this.comps = comps;
    this.kcal = kcal;
  }

  static calculateCalories() {
    const kcals = document.querySelectorAll('#kcal');
    let totalKcal = 0;
    kcals.forEach((meal) => {
      if (meal.parentElement.style.display === '') {
        if (meal.innerText === '') {
          totalKcal = totalKcal;
        } else {
          totalKcal = totalKcal + parseInt(meal.innerText);
        }
      }
    });
    return totalKcal;
  }

  static totalCalories() {
    const text = document.getElementById('totalKcalText');
    const totalKcal = Meal.calculateCalories();
    text.innerHTML = 'Total: ' + totalKcal;
  }
}

class Tren {
  constructor(exer, sets, reps, weight) {
    this.id = Date.now();
    const d = new Date();
    this.date = d.toLocaleDateString('en-CA');
    this.exer = exer;
    this.reps = reps;
    this.sets = sets;
    this.weight = weight;
    this.volume = 0;
  }

  static calculateVolume(sets, reps, weight) {
    return sets * reps * weight;
  }

  static totalVolume() {
    const text = document.getElementById('totalVolume');
    const totalVolume = (text.innerHTML = 'Volume: ' + totalVolume);
  }
}

// UI class
class UI {
  //meals
  static displayMeals() {
    const meals = Store.getMeals();

    meals.forEach((meal) => UI.addMealToList(meal));
  }

  static addMealToList(meal) {
    const list = document.querySelector('#meal-list');
    const row = document.createElement('tr');

    row.setAttribute('data-id', meal.id);
    row.setAttribute('data-date', meal.date);
    row.innerHTML = `
        <td>${meal.time}</td>
        <td>${meal.comps}</td>
        <td id="kcal">${meal.kcal}</td>
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
    const container = document.querySelectorAll('.container')[1];
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

//TREN section

  static displayExercise() {
    const exers = Store.getExercise();

    exers.forEach((exer) => UI.addExerciseToList(exer));
  }

  static addExerciseToList(exer) {
    const list = document.querySelector('#tren-list');
    const row = document.createElement('tr');

    row.setAttribute('data-id', meal.id);
    row.setAttribute('data-date', meal.date);
    row.innerHTML = `
        <td>${meal.time}</td>
        <td>${meal.comps}</td>
        <td>${meal.comps}</td>
        <td id="kcal">${meal.kcal}</td>
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
    const container = document.querySelectorAll('.container')[1];
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

}

function filterRowsByDate(date) {
  const rows = Array.from(document.querySelectorAll('#meal-table tbody tr'));
  rows.forEach((row) => {
    const rowDate = row.getAttribute('data-date');
    row.style.display = rowDate == date ? '' : 'none';
  });
}

function filterRowsByDate(date) {
  const rows = Array.from(document.querySelectorAll('#meal-table tbody tr'));
  rows.forEach((row) => {
    const rowDate = row.getAttribute('data-date');
    row.style.display = rowDate == date ? '' : 'none';
  });
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

  // for exer or tren xd

  static getExercise() {
    let exer;
    if (localStorage.getItem('exer') === null) {
      exer = [];
    } else {
      exer = JSON.parse(localStorage.getItem('exer'));
    }
    return exer;
  }

  static addMeal(exer) {
    const exers = Store.getExercise();

    exers.push(exer);

    localStorage.setItem('exers', JSON.stringify(exers));
  }

  static removeExercise(id) {
    const exers = Store.getExercise();

    exers.forEach((exer, index) => {
      if (exer.id == id) {
        exers.splice(index, 1);
      }
    });

    localStorage.setItem('exers', JSON.stringify(exers));
  }
}

//event: display
document.addEventListener('DOMContentLoaded', UI.displayMeals);
// filter and set date
document.addEventListener('DOMContentLoaded', () => {
  const dateInput = document.getElementById('datePicker'); // Change this to your date input ID
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-CA'); // Get date in "YYYY-MM-DD" format
  dateInput.value = formattedDate;
  filterRowsByDate(formattedDate);
});
// calc cals
document.addEventListener('DOMContentLoaded', Meal.totalCalories);

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
  Meal.totalCalories();
  //add meal to store
  Store.addMeal(meal);
  //show nigga msg
  UI.showAlert('NIGGA', 'success');
  //clear fields
  UI.clearFields();
});

//add exercise

document.querySelector('#tren-form').addEventListener('submit', (e) => {
  e.preventDefault();
  //get form value
  const exName = document.querySelector('#exercise-name').value;
  const sets = document.querySelector('#sets-select').value;
  const reps = document.querySelector('#reps-select').value;
  const weight = document.querySelector('#form-weight').value;
  //instantiate
  const exer = new Tren(exName, sets, reps, weight);
  const volume = Tren.calculateVolume(sets, reps, weight);
  // add meal to UI
  UI.addExerToList(exer);
  //add meal to store
  Store.addExer(exer);
  //show nigga msg
  UI.showAlert('NIGGA', 'success');
  //clear fields
  UI.clearFields();
});

//event:REMOVE
document.querySelector('#meal-list').addEventListener('click', (e) => {
  UI.deleteMeal(e.target); //from UI
  Meal.totalCalories();
  let id = e.target.parentElement.parentElement.getAttribute('data-id');
  Store.removeMeal(id); //from store
});

//changing date
const datePicker = document.getElementById('datePicker');

datePicker.addEventListener('change', (event) => {
  const selectedDate = event.target.value;
  if (selectedDate) {
    filterRowsByDate(selectedDate);
    Meal.totalCalories();
  } else {
    // Show no rows if no date is selected
    const rows = Array.from(document.querySelectorAll('#meal-table tbody tr'));
    rows.forEach((row) => (row.style.display = 'none'));
  }
});

//toggling between meals and trening
document.querySelector('#meal-nav').addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('.meal-page').classList.remove('hidden');
  document.querySelector('.trening-page').classList.add('hidden');
});

document.querySelector('#trening-nav').addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('.meal-page').classList.add('hidden');
  document.querySelector('.trening-page').classList.remove('hidden');
});

//tasks: style it out!
//navbar
//total kcal and volume
