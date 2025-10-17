const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1/';

const globalSearchForm = document.getElementById('globalSearchForm');
const globalSearchInput = document.getElementById('globalSearchInput');
const surpriseMeLink = document.getElementById('surpriseMeLink');

if (globalSearchForm) {
    globalSearchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        globalSearchInput.classList.remove('is-invalid');
        let query = globalSearchInput.value.trim();

        query = query.replace(/ /g, '+');
        query = query.replace(/[^a-zA-Z+]/g, '');

        if (query) {
            window.location.href = `search-results.html?query=${query}`;
        } else {
            globalSearchInput.classList.add('is-invalid');
            alert('Please enter a valid search term (letters, numbers, and spaces only).');
        }
        globalSearchInput.value = '';
    });
}

if (surpriseMeLink) {
    surpriseMeLink.addEventListener('click', (event) => {
        event.preventDefault();
        window.location.href = `surprise.html`;
    });
}

// Logic for protein.html
if (document.body.id === 'protein-page') {
    const proteinCategoryCardsContainer = document.getElementById('proteinCategoryCards');
    const proteinCategorySelectionSection = document.getElementById('proteinCategorySelection');
    const selectedCategoryRecipesSection = document.getElementById('selectedCategoryRecipes');
    const selectedCategoryTitle = document.getElementById('selectedCategoryTitle');
    const proteinRecipesDisplay = document.getElementById('proteinRecipesDisplay');

    document.addEventListener('DOMContentLoaded', () => {
        if (proteinCategoryCardsContainer) {
            proteinCategoryCardsContainer.querySelectorAll('.card').forEach(card => {
                card.addEventListener('click', (event) => {
                    const selectedCategory = event.currentTarget.dataset.category;

                    selectedCategoryTitle.textContent = `${selectedCategory} Recipes`;
                    proteinRecipesDisplay.innerHTML = '<p class="col-12 text-center">Loading recipes...</p>';

                    proteinCategorySelectionSection.style.display = 'none';
                    selectedCategoryRecipesSection.style.display = 'block';

                    fetch(`${API_BASE_URL}filter.php?c=${selectedCategory}`)
                        .then(response => response.json())
                        .then(data => {
                            const recipes = data.meals || [];

                            proteinRecipesDisplay.innerHTML = '';

                            if (recipes.length > 0) {
                                recipes.forEach(meal => {
                                    const col = document.createElement('div');
                                    col.className = 'col';
                                    col.innerHTML = `
                                        <div class="card h-100" data-id="${meal.idMeal}">
                                            <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                                            <div class="card-body">
                                                <h5 class="card-title">${meal.strMeal}</h5>
                                                <p class="card-text">${meal.strCategory || 'N/A'} | ${meal.strArea || 'N/A'}</p>
                                            </div>
                                        </div>
                                    `;
                                    proteinRecipesDisplay.appendChild(col);
                                });

                                proteinRecipesDisplay.querySelectorAll('.card').forEach(recipeCard => {
                                    recipeCard.addEventListener('click', (event) => {
                                        const mealId = event.currentTarget.dataset.id;
                                        window.location.href = `recipe-details.html?id=${mealId}`;
                                    });
                                });
                            } else {
                                proteinRecipesDisplay.innerHTML = '<p class="col-12 text-center">No recipes found for this category.</p>';
                            }
                        })
                        .catch(error => {
                            console.error(`Error fetching ${selectedCategory} recipes:`, error);
                            proteinRecipesDisplay.innerHTML = '<p class="col-12 text-danger text-center">Failed to load recipes. Please try again.</p>';
                        });
                });
            });
        }
    });
}

// Logic for desserts.html
if (document.body.id === 'desserts-page') {
    document.addEventListener('DOMContentLoaded', () => {
        const dessertsDisplayArea = document.getElementById('dessertsDisplayArea');
        if (!dessertsDisplayArea) return;

        dessertsDisplayArea.innerHTML = '<p class="col-12 text-center">Loading desserts...</p>';
        fetch(`${API_BASE_URL}filter.php?c=Dessert`)
            .then(response => response.json())
            .then(data => {
                const desserts = data.meals || [];

                dessertsDisplayArea.innerHTML = '';

                if (desserts.length > 0) {
                    desserts.forEach(meal => {
                        const col = document.createElement('div');
                        col.className = 'col';
                        col.innerHTML = `
                            <div class="card h-100" data-id="${meal.idMeal}">
                                <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                                <div class="card-body">
                                    <h5 class="card-title">${meal.strMeal}</h5>
                                    <p class="card-text">${meal.strCategory || 'N/A'} | ${meal.strArea || 'N/A'}</p>
                                </div>
                            </div>
                        `;
                        dessertsDisplayArea.appendChild(col);
                    });

                    dessertsDisplayArea.querySelectorAll('.card').forEach(recipeCard => {
                        recipeCard.addEventListener('click', (event) => {
                            const mealId = event.currentTarget.dataset.id;
                            window.location.href = `recipe-details.html?id=${mealId}`;
                        });
                    });
                } else {
                    dessertsDisplayArea.innerHTML = '<p class="col-12 text-center">No desserts found.</p>';
                }

            })
            .catch(error => {
                console.error('Error fetching desserts:', error);
                dessertsDisplayArea.innerHTML = '<p class="col-12 text-danger text-center">Failed to load desserts. Please try again.</p>';
            });
    });
}

// Logic for breakfast.html
if (document.body.id === 'breakfast-page') {
    document.addEventListener('DOMContentLoaded', () => {
        const breakfastsDisplayArea = document.getElementById('breakfastsDisplayArea');
        if (!breakfastsDisplayArea) return;

        breakfastsDisplayArea.innerHTML = '<p class="col-12 text-center">Loading breakfast recipes...</p>';
        fetch(`${API_BASE_URL}filter.php?c=Breakfast`)
            .then(response => response.json())
            .then(data => {
                const breakfasts = data.meals || [];

                breakfastsDisplayArea.innerHTML = '';

                if (breakfasts.length > 0) {
                    breakfasts.forEach(meal => {
                        const col = document.createElement('div');
                        col.className = 'col';
                        col.innerHTML = `
                            <div class="card h-100" data-id="${meal.idMeal}">
                                <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                                <div class="card-body">
                                    <h5 class="card-title">${meal.strMeal}</h5>
                                    <p class="card-text">${meal.strCategory || 'N/A'} | ${meal.strArea || 'N/A'}</p>
                                </div>
                            </div>
                        `;
                        breakfastsDisplayArea.appendChild(col);
                    });

                    breakfastsDisplayArea.querySelectorAll('.card').forEach(recipeCard => {
                        recipeCard.addEventListener('click', (event) => {
                            const mealId = event.currentTarget.dataset.id;
                            window.location.href = `recipe-details.html?id=${mealId}`;
                        });
                    });
                } else {
                    breakfastsDisplayArea.innerHTML = '<p class="col-12 text-center">No breakfast recipes found.</p>';
                }

            })
            .catch(error => {
                console.error('Error fetching breakfasts:', error);
                breakfastsDisplayArea.innerHTML = '<p class="col-12 text-danger text-center">Failed to load breakfast recipes. Please try again.</p>';
            });
    });
}

// Logic for vegan.html
if (document.body.id === 'vegan-page') {
    document.addEventListener('DOMContentLoaded', () => {
        const veganDisplayArea = document.getElementById('veganDisplayArea');
        if (!veganDisplayArea) return;

        veganDisplayArea.innerHTML = '<p class="col-12 text-center">Loading vegan recipes...</p>';
        fetch(`${API_BASE_URL}filter.php?c=Vegan`)
            .then(response => response.json())
            .then(data => {
                const veganMeals = data.meals || [];

                veganDisplayArea.innerHTML = '';

                if (veganMeals.length > 0) {
                    veganMeals.forEach(meal => {
                        const col = document.createElement('div');
                        col.className = 'col';
                        col.innerHTML = `
                            <div class="card h-100" data-id="${meal.idMeal}">
                                <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                                <div class="card-body">
                                    <h5 class="card-title">${meal.strMeal}</h5>
                                    <p class="card-text">${meal.strCategory || 'N/A'} | ${meal.strArea || 'N/A'}</p>
                                </div>
                            </div>
                        `;
                        veganDisplayArea.appendChild(col);
                    });

                    veganDisplayArea.querySelectorAll('.card').forEach(recipeCard => {
                        recipeCard.addEventListener('click', (event) => {
                            const mealId = event.currentTarget.dataset.id;
                            window.location.href = `recipe-details.html?id=${mealId}`;
                        });
                    });
                } else {
                    veganDisplayArea.innerHTML = '<p class="col-12 text-center">No vegan recipes found.</p>';
                }
            })
            .catch(error => {
                console.error('Error fetching vegan recipes:', error);
                veganDisplayArea.innerHTML = '<p class="col-12 text-danger text-center">Failed to load vegan recipes. Please try again.</p>';
            });
    });
}

// Logic for surprise.html
if (document.body.id === 'surprise-page') {
    document.addEventListener('DOMContentLoaded', () => {
        fetch(`${API_BASE_URL}random.php`)
            .then(response => response.json())
            .then(data => {
                const randomMeal = data.meals ? data.meals[0] : null;

                if (randomMeal) {
                    window.location.href = `recipe-details.html?id=${randomMeal.idMeal}`;
                } else {
                    alert('Could not find a random recipe. Redirecting back to Protein page.');
                    window.location.href = `protein.html`;
                }
            })
            .catch(error => {
                console.error('Error fetching random recipe for surprise page:', error);
                alert('Failed to fetch a random recipe. Redirecting back to Protein page.');
                window.location.href = `protein.html`;
            });
    });
}

// Logic for recipe-details.html
if (document.body.id === 'recipe-details-page') {
    document.addEventListener('DOMContentLoaded', () => {
        let mealId = null;
        const queryString = window.location.search;
        if (queryString) {
            const parts = queryString.split('id=');
            if (parts.length > 1) {
                const idAndOtherSuffix = parts[1];
                const id = idAndOtherSuffix.split('&');
                mealId = id[0];
            }
        }
        const recipeDetailsContent = document.getElementById('recipeDetailsContent');
        if (!recipeDetailsContent) {
            console.error('Recipe details content area not found.');
            return;
        }

        if (mealId) {
            recipeDetailsContent.innerHTML = '<p class="text-center">Loading recipe details...</p>';
            fetch(`${API_BASE_URL}lookup.php?i=${mealId}`)
                .then(response => response.json())
                .then(data => {
                    const meal = data.meals ? data.meals[0] : null;

                    if (meal) {
                        let ingredientsList = '';
                        for (let i = 1; i <= 20; i++) {
                            const ingredient = meal[`strIngredient${i}`];
                            const measure = meal[`strMeasure${i}`];
                            if (ingredient && ingredient.trim() !== '') {
                                ingredientsList += `<li>${measure ? measure.trim() : ''} ${ingredient.trim()}</li>`;
                            }
                        }

                        recipeDetailsContent.innerHTML = `
                            <div class="row">
                                <div class="col-md-5">
                                    <img src="${meal.strMealThumb}" class="img-fluid rounded mb-3" alt="${meal.strMeal}">
                                </div>
                                <div class="col-md-7">
                                    <h1 class="mb-3">${meal.strMeal}</h1>
                                    <p class="lead"><strong>Category:</strong> ${meal.strCategory || 'N/A'}</p>
                                    <p class="lead"><strong>Cuisine:</strong> ${meal.strArea || 'N/A'}</p>
                                    ${meal.strSource ? `<p><a href="${meal.strSource}" target="_blank" class="btn btn-outline-info btn-sm">View Original Source</a></p>` : ''}
                                    ${meal.strYoutube ? `<p><a href="${meal.strYoutube}" target="_blank" class="btn btn-danger btn-sm me-2">Watch on YouTube</a></p>` : ''}
                                </div>
                            </div>

                            <div class="mt-4">
                                <h2>Ingredients:</h2>
                                <ul class="list-unstyled">
                                    ${ingredientsList || '<li>No ingredients listed.</li>'}
                                </ul>
                            </div>

                            <div class="mt-4">
                                <h2>Instructions:</h2>
                                ${meal.strInstructions ? meal.strInstructions.split('\r\n').filter(p => p.trim() !== '').map(p => `<p>${p.trim()}</p>`).join('') : '<p>No instructions provided.</p>'}
                            </div>
                        `;
                    } else {
                        recipeDetailsContent.innerHTML = '<p class="text-danger text-center">Recipe not found.</p>';
                    }
                })
                .catch(error => {
                    console.error('Error fetching recipe details:', error);
                    recipeDetailsContent.innerHTML = '<p class="text-danger text-center">Failed to load recipe details. Please try again.</p>';
                });
        } else {
            recipeDetailsContent.innerHTML = '<p class="text-danger text-center">No recipe ID provided.</p>';
        }
    });
}
// Logic for search-results.html
if (document.body.id === 'search-results-page') {
    document.addEventListener('DOMContentLoaded', () => {
        let searchQuery = '';
        const queryString = window.location.search;
        if (queryString) {
            const parts = queryString.split('query=');
            if (parts.length > 1) {
                const queryAndMaybeOtherParams = parts[1];
                const cleanQueryParts = queryAndMaybeOtherParams.split('&');
                searchQuery = cleanQueryParts[0];
                searchQuery = searchQuery.replace(/\+/g, ' ');
            }
        }
        const searchResultsTitle = document.getElementById('searchResultsTitle');
        const searchResultsDisplayArea = document.getElementById('searchResultsDisplayArea');

        if (!searchResultsDisplayArea) return;

        if (searchQuery) {
            searchResultsTitle.textContent = `Search Results for "${searchQuery}"`;
            searchResultsDisplayArea.innerHTML = '<p class="col-12 text-center">Loading search results...</p>';

            fetch(`${API_BASE_URL}search.php?s=${searchQuery}`)
                .then(response => response.json())
                .then(data => {
                    const recipes = data.meals || [];
                    searchResultsDisplayArea.innerHTML = '';

                    if (recipes.length > 0) {
                        recipes.forEach(meal => {
                            const col = document.createElement('div');
                            col.className = 'col'; // Bootstrap column for responsive grid
                            col.innerHTML = `
                                <div class="card h-100" data-id="${meal.idMeal}">
                                    <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                                    <div class="card-body">
                                        <h5 class="card-title">${meal.strMeal}</h5>
                                        <p class="card-text">${meal.strCategory || 'N/A'} | ${meal.strArea || 'N/A'}</p>
                                    </div>
                                </div>
                            `;
                            searchResultsDisplayArea.appendChild(col);
                        });
                        searchResultsDisplayArea.querySelectorAll('.card').forEach(recipeCard => {
                            recipeCard.addEventListener('click', (event) => {
                                const mealId = event.currentTarget.dataset.id;
                                window.location.href = `recipe-details.html?id=${mealId}`;
                            });
                        });
                    } else {
                        searchResultsDisplayArea.innerHTML = '<p class="col-12 text-center">No recipes found for your search.</p>';
                    }
                })
                .catch(error => {
                    console.error('Error fetching search results:', error);
                    searchResultsDisplayArea.innerHTML = '<p class="col-12 text-danger text-center">Failed to load search results. Please try again.</p>';
                });
        } else {
            searchResultsTitle.textContent = "Please enter a search query.";
            searchResultsDisplayArea.innerHTML = '<p class="col-12 text-center">Type a recipe name into the search bar above and press Enter or click "Search".</p>';
        }
    });
}