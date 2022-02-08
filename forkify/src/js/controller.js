// if (module.hot) {
//   module.hot.accept();
// }

import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'regenerator-runtime/runtime'; // polyfill async await
import 'core-js/stable'; // polyfill everything else

const recipeContainer = document.querySelector('.recipe');

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
    const id = window.location.hash.slice(1); // #5ed6604591c37cdc054bca57
    if (!id) return;
    recipeView.renderSpinner();

    // loading recipe
    await model.loadRecipe(id);

    // rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.log(err);
  }
};
// https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza

controlRecipes();

['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipes)
);

// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);
