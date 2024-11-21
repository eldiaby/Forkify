import * as module from './module.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

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
    // resultsView.render(module.state.search.result);
    resultsView.render(module.getSearchResultsPage());

    // 4) Render pagination
    paginationView.render(module.state.search);
  } catch (error) {
    console.error(error);
  }
};

const controlPaginationBtns = function (target) {
  // 1) Render results
  resultsView.render(module.getSearchResultsPage(target));

  // 2) Render pagination
  paginationView.render(module.state.search);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(contrlSearchResults);
  paginationView.handlePaginationBtns(controlPaginationBtns);
};

init();
