import * as module from './module.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');
// import data from './../../node_modules/type-fest/source/readonly-deep.d';
// import { error } from './../../node_modules/@parcel/reporter-cli/src/emoji';

// https://forkify-api.herokuapp.com/v2

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

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};

init();
