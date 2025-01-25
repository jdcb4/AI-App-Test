const foodCard = document.getElementById("food-card");
const foodImage = document.getElementById("food-image");
const foodName = document.getElementById("food-name");
const likeButton = document.getElementById("like");
const dislikeButton = document.getElementById("dislike");
const resultContainer = document.getElementById("result-container");

let currentIndex = 0;
let currentStep = "categories";
let selectedCategories = [];
let selectedFoods = [];

const categories = [
  { name: "Italian", image: "https://placehold.co/400x300?text=italian" },
  { name: "Asian", image: "https://placehold.co/400x300?text=asian" },
  { name: "Mexican", image: "https://placehold.co/400x300?text=mexican" },
  { name: "American", image: "https://placehold.co/400x300?text=american" },
  { name: "Desserts", image: "https://placehold.co/400x300?text=desserts" },
];

const foods = {
  Italian: [
    {
      name: "Pizza",
      image: "https://placehold.co/400x300?text=pizza",
      description: "Classic Italian pizza with various toppings",
      recipe:
        "Pizza recipe: 1. Make dough... 2. Add sauce... 3. Add toppings... 4. Bake...",
    },
    {
      name: "Pasta",
      image: "https://placehold.co/400x300?text=pasta",
      description: "Delicious pasta dishes with different sauces",
      recipe:
        "Pasta recipe: 1. Boil pasta... 2. Prepare sauce... 3. Combine and serve...",
    },
    {
      name: "Lasagna",
      image: "https://placehold.co/400x300?text=lasagna",
      description: "Layered pasta dish with meat and cheese",
      recipe:
        "Lasagna recipe: 1. Prepare meat sauce... 2. Layer pasta sheets... 3. Add cheese... 4. Bake...",
    },
  ],
  Asian: [
    {
      name: "Sushi",
      image: "https://placehold.co/400x300?text=sushi",
      description: "Japanese dish with vinegared rice and various toppings",
      recipe:
        "Sushi recipe: 1. Prepare sushi rice... 2. Cut fish... 3. Roll sushi... 4. Slice and serve...",
    },
    {
      name: "Ramen",
      image: "https://placehold.co/400x300?text=ramen",
      description: "Japanese noodle soup with various ingredients",
      recipe:
        "Ramen recipe: 1. Prepare broth... 2. Cook noodles... 3. Add toppings... 4. Serve hot...",
    },
    {
      name: "Dumplings",
      image: "https://placehold.co/400x300?text=dumplings",
      description: "Filled dough pockets, steamed or fried",
      recipe:
        "Dumplings recipe: 1. Make dough... 2. Prepare filling... 3. Fold dumplings... 4. Steam or fry...",
    },
  ],
  Mexican: [
    {
      name: "Tacos",
      image: "https://placehold.co/400x300?text=tacos",
      description: "Folded tortillas filled with various ingredients",
      recipe:
        "Tacos recipe: 1. Prepare filling... 2. Warm tortillas... 3. Assemble tacos... 4. Add toppings...",
    },
    {
      name: "Burrito",
      image: "https://placehold.co/400x300?text=burrito",
      description:
        "Wrapped tortilla filled with meat, beans, and other ingredients",
      recipe:
        "Burrito recipe: 1. Cook filling... 2. Warm tortilla... 3. Add ingredients... 4. Wrap and serve...",
    },
  ],
  American: [
    {
      name: "Burger",
      image: "https://placehold.co/400x300?text=burger",
      description: "Classic beef patty served in a bun with various toppings",
      recipe:
        "Burger recipe: 1. Form patties... 2. Grill or fry... 3. Toast buns... 4. Assemble with toppings...",
    },
    {
      name: "Fried Chicken",
      image: "https://placehold.co/400x300?text=fried-chicken",
      description: "Crispy, juicy chicken pieces coated and deep-fried",
      recipe:
        "Fried Chicken recipe: 1. Marinate chicken... 2. Coat in flour mixture... 3. Fry until golden... 4. Drain and serve...",
    },
  ],
  Desserts: [
    {
      name: "Ice Cream",
      image: "https://placehold.co/400x300?text=ice-cream",
      description: "Creamy frozen dessert in various flavors",
      recipe:
        "Ice Cream recipe: 1. Prepare base... 2. Add flavorings... 3. Churn in ice cream maker... 4. Freeze and serve...",
    },
    {
      name: "Chocolate Cake",
      image: "https://placehold.co/400x300?text=chocolate-cake",
      description: "Rich, moist cake made with cocoa and chocolate",
      recipe:
        "Chocolate Cake recipe: 1. Mix dry ingredients... 2. Add wet ingredients... 3. Bake in oven... 4. Frost and decorate...",
    },
  ],
};

// ... (rest of the code remains unchanged)

function showNext() {
  if (currentStep === "categories") {
    showNextCategory();
  } else if (currentStep === "foods") {
    showNextFood();
  }
}

function showNextCategory() {
  if (currentIndex < categories.length) {
    const category = categories[currentIndex];
    foodImage.src = category.image;
    foodName.textContent = category.name;
    currentIndex++;
  } else {
    currentStep = "foods";
    currentIndex = 0;
    showNextFood();
  }
}

function showNextFood() {
  const availableFoods = getAvailableFoods();
  if (currentIndex < availableFoods.length) {
    const food = availableFoods[currentIndex];
    foodImage.src = food.image;
    foodName.textContent = food.name;
    currentIndex++;
  } else {
    showResults();
  }
}

function handleLike() {
  if (currentStep === "categories") {
    selectedCategories.push(categories[currentIndex - 1].name);
  } else if (currentStep === "foods") {
    const availableFoods = getAvailableFoods();
    selectedFoods.push(availableFoods[currentIndex - 1]);
  }
  showNext();
}

function handleDislike() {
  showNext();
}

function getAvailableFoods() {
  return selectedCategories.flatMap((category) => foods[category]);
}

function showResults() {
  foodCard.style.display = "none";
  resultContainer.style.display = "block";
  resultContainer.innerHTML = `
    <h2>Your Selected Recipes:</h2>
    <img src="https://placehold.co/400x300?text=Results+Image" alt="Results Image" class="results-image">
  `;
  selectedFoods.forEach((food, index) => {
    resultContainer.innerHTML += `
      <div class="recipe">
        <h3>${food.name}</h3>
        <p>${food.description}</p>
        <button onclick="showFullRecipe(${index})">View Full Recipe</button>
      </div>
    `;
  });
}

function showFullRecipe(index) {
  const food = selectedFoods[index];
  resultContainer.innerHTML = `
    <h2>${food.name} Recipe</h2>
    <img src="${food.image}" alt="${food.name} Image" class="food-image">
    <p>${food.recipe}</p>
    <button onclick="showResults()">Back to Results</button>
  `;
}

function addSwipeClasses(direction) {
  foodCard.classList.add("swiping");
  foodCard.classList.add(`swipe-${direction}`);
}

function removeSwipeClasses() {
  foodCard.classList.remove("swiping");
  foodCard.classList.remove("swipe-left");
  foodCard.classList.remove("swipe-right");
}

// Set up Hammer.js for swipe gestures
const hammer = new Hammer(foodCard);
hammer.on("swipeleft", () => {
  addSwipeClasses("left");
  setTimeout(() => {
    handleDislike();
    removeSwipeClasses();
  }, 500); // Adjust the timeout duration based on your desired animation duration
});

hammer.on("swiperight", () => {
  addSwipeClasses("right");
  setTimeout(() => {
    handleLike();
    removeSwipeClasses();
  }, 500); // Adjust the timeout duration based on your desired animation duration
});

// Set up button click events
likeButton.addEventListener("click", handleLike);
dislikeButton.addEventListener("click", handleDislike);

// Show the first category
showNext();

// Add CSS styles for swipe animations
const style = document.createElement("style");
style.innerHTML = `
  .swiping {
    transition: transform 0.5s ease-in-out; /* Adjust the duration as needed */
  }

  .swipe-left {
    transform: translateX(-100%);
  }

  .swipe-right {
    transform: translateX(100%);
  }
`;
document.head.appendChild(style);
