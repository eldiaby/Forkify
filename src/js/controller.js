import * as module from './module.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

if (module.hot) {
  module.hot.accept('./module.js', function () {
    // Logic to update the module without reloading the whole page
    console.log('Module updated!');
  });
}

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // Loading recipe
    await module.loadRecipe(id);
    const { recipe } = module.state;

    // Rendering recipe
    recipeView.render(module.state.recipe);
  } catch (error) {
    // console.error(error);
    recipeView.renderError();
  }
};

const contrlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await module.loadSearchResults(query);

    // 3) Render results
    // console.log(module.state.search.result);
    resultsView.render(module.state.search.result);
  } catch (error) {
    console.error(error);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(contrlSearchResults);
};

init();
