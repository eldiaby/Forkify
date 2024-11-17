const recipeContainer = document.querySelector('.recipe');
import data from './../../node_modules/type-fest/source/readonly-deep.d';
import { error } from './../../node_modules/@parcel/reporter-cli/src/emoji';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const showRecipe = async function () {
  try {
    var res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/664c8f193e7aa067e94e863b`
    );

    var data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    let { recipe } = data.data;

    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(recipe);
  } catch (error) {
    window.alert(error);
  }
};

showRecipe();
