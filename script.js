const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const mealsContainer = document.getElementById("meals");
const resultHeading = document.getElementById("result-heading");
const errorContainer = document.getElementById("error-container");
const mealDetails = document.getElementById("meal-details");
const mealDetailsContent = document.querySelector(".meal-details-content");
const backBtn = document.getElementById("back-btn");

const BASE_URL = "https://www.themealdb.com/api/jspm/v1/1";
const SEARCH_URL = `${BASE_URL}search.php?s=`;
const LOOKUP_URL = `${BASE_URL}lookup.php?i=`;

searchBtn.addEventListener("click", searchMeals);
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchMeals();
});

async function searchMeals() {
  const searchTerm = searchInput.value.trim();

  if (!searchTerm) {
    errorContainer.textContent = "Please enter a search term";
    errorContainer.classList.remove("hidden");
    return;
  }

  try {
    resultHeading.textContent = `Searching for "${searchTerm}"...`;
    mealsContainer.innerHTML = "";
    errorContainer.classList.add("hidden");

    //fetch meals from API
    // www.themealdb.com/api/json/v1/1/searchBtn.php?s=chicken
    const response = await fetch(`${SEARCH_URL}${searchTerm}`);
    const data = await response.json();

    console.log("data is here:", data);
    if (data.meals === null) {
      resultHeading.textContent = ``;
      mealsContainer.innerHTML = "";
      errorContainer.textContent = `No recipes found for "${searchTerm}".
        Try another search term!`;
      errorContainer.classList.remove("hidden");
    } else {
      resultHeading.textContent = `Search results for "${searchTerm}":`;
      displayMeals(data.meals);
      searchInput.value = "";
    }
  } catch (error) {
    errorContainer.textContent =
      "Something went wrong. Please try again later.";
    errorContainer.classList.remove("hidden");
  }
}

function displayMeals(meals) {
  mealsContainer.innerHTML = "";

  meals.forEach((meal) => {
    mealsContainer.innerHTML += `
    
    <div>
    </div>`;
  });
}
