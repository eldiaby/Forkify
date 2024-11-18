import * as module from './module.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');
// import data from './../../node_modules/type-fest/source/readonly-deep.d';
// import { error } from './../../node_modules/@parcel/reporter-cli/src/emoji';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

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
    window.alert(error);
  }
};

// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);

['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipes)
);
