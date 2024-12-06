import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';
import data from './../../node_modules/type-fest/source/readonly-deep.d';

export const state = {
  recipe: {},
  search: {
    query: '',
    result: [],
    page: 1,
    resultPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);

    const { recipe } = data.data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    // console.log(state.recipe);
    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmark = true;
    else state.recipe.bookmark = false;
  } catch (error) {
    console.error(`${error} ✂️`);
    throw error;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);

    state.search.result = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });
    state.search.page = 1;
  } catch (error) {
    console.error(`${error} ✂️`);
    throw error;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultPerPage;
  const end = page * state.search.resultPerPage;
  return state.search.result.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    // Updating the ingredients quantity
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });

  // Updating the servings with the new one
  state.recipe.servings = newServings;
};

export const addBookmark = function (recipe) {
  // add recipe to bookmark recipes array
  state.bookmarks.push(recipe);

  if (recipe.id === state.recipe.id) state.recipe.bookmark = true;
};

export const deleteBookmark = function (id) {
  // Delete the recipe from bookmark
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);

  if (id === state.recipe.id) state.recipe.bookmark = false;
};
