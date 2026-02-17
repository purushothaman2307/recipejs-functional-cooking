const recipes = [
  { id: 1, title: "Spaghetti Aglio e Olio", time: 20, difficulty: "easy", description: "Simple Italian pasta with garlic and olive oil.", category: "pasta" },
  { id: 2, title: "Chicken Stir Fry", time: 25, difficulty: "easy", description: "Quick chicken stir fry with vegetables.", category: "dinner" },
  { id: 3, title: "Beef Wellington", time: 90, difficulty: "hard", description: "Beef wrapped in puff pastry.", category: "gourmet" },
  { id: 4, title: "Vegetable Curry", time: 45, difficulty: "medium", description: "Flavorful vegetable curry.", category: "curry" },
  { id: 5, title: "Caesar Salad", time: 15, difficulty: "easy", description: "Crisp lettuce with Caesar dressing.", category: "salad" },
  { id: 6, title: "Ramen from Scratch", time: 120, difficulty: "hard", description: "Authentic homemade ramen.", category: "soup" },
  { id: 7, title: "Grilled Salmon", time: 35, difficulty: "medium", description: "Grilled salmon with lemon butter.", category: "seafood" },
  { id: 8, title: "Chocolate Soufflé", time: 70, difficulty: "hard", description: "Light and airy chocolate dessert.", category: "dessert" }
];

const recipeContainer = document.querySelector("#recipe-container");

const createRecipeCard = (recipe) => {
  return `
    <div class="recipe-card" data-id="${recipe.id}">
      <h3>${recipe.title}</h3>
      <div class="recipe-meta">
        <span>⏱️ ${recipe.time} min</span>
        <span class="difficulty ${recipe.difficulty}">${recipe.difficulty}</span>
      </div>
      <p>${recipe.description}</p>
    </div>
  `;
};

const renderRecipes = (recipeArray) => {
  const recipeHTML = recipeArray
    .map(recipe => createRecipeCard(recipe))
    .join("");

  recipeContainer.innerHTML = recipeHTML;
};

// --- State ---
let currentFilter = 'all';
let currentSort = 'none';

// --- Pure filter functions ---
const filterByDifficulty = (recipesArr, difficulty) => {
  return recipesArr.filter(r => r.difficulty === difficulty);
};

const filterByTime = (recipesArr, maxTime) => {
  return recipesArr.filter(r => r.time <= maxTime);
};

const applyFilter = (recipesArr, filterType) => {
  switch (filterType) {
    case 'easy':
    case 'medium':
    case 'hard':
      return filterByDifficulty(recipesArr, filterType);
    case 'quick':
      return filterByTime(recipesArr, 30);
    case 'all':
    default:
      return recipesArr.slice();
  }
};

// --- Pure sort functions (use spread before sort) ---
const sortByName = (recipesArr) => {
  return [...recipesArr].sort((a, b) => a.title.localeCompare(b.title));
};

const sortByTime = (recipesArr) => {
  return [...recipesArr].sort((a, b) => a.time - b.time);
};

const applySort = (recipesArr, sortType) => {
  switch (sortType) {
    case 'name':
      return sortByName(recipesArr);
    case 'time':
      return sortByTime(recipesArr);
    case 'none':
    default:
      return recipesArr.slice();
  }
};

// Central update function: applies filter, then sort, then renders
const updateDisplay = () => {
  const filtered = applyFilter(recipes, currentFilter);
  const sorted = applySort(filtered, currentSort);
  renderRecipes(sorted);
};

// --- Event listeners for buttons ---
document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const sortButtons = document.querySelectorAll('.sort-btn');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      currentFilter = btn.getAttribute('data-filter');
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updateDisplay();
    });
  });

  sortButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      currentSort = btn.getAttribute('data-sort');
      sortButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updateDisplay();
    });
  });

  // Initial render
  updateDisplay();
});