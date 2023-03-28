import React, { useState, useEffect } from 'react';
import './ShowRecipes.css';
import 'primeicons/primeicons.css';
import { RecipeCard } from './RecipeCard';
import { Paginate } from './Paginate';

export const ShowRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [url, setUrl] = useState(
    'https://api.spoonacular.com/recipes/complexSearch?cuisine=french,american,chinese,italian,african&number=56&apiKey=dd5c172973c04526bd48a30d4926cafb'
  );
  const [loading, setLoading] = useState(true);

  // HANDLE PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const fetchRecipes = async () => {
    const response = await fetch(url);
    const data = await response.json();
    const dataResults = data.results;
    console.log(dataResults);
    getRecipeInformation(dataResults);
    setLoading(false);
  };

  const getRecipeInformation = async (response) => {
    response.map(async (item) => {
      const recipe = await fetch(
        `https://api.spoonacular.com/recipes/${item.id}/information?apiKey=dd5c172973c04526bd48a30d4926cafb`
      );

      const recipeData = await recipe.json();
      setRecipes((state) => {
        state = [...state, recipeData];
        console.log('STATE', state);
        return state;
      });
    });
  };

  useEffect(() => {
    fetchRecipes();
  }, [url]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = recipes.slice(indexOfFirstPost, indexOfLastPost);

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== Math.ceil(recipes.length / postsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="recipes-panel">
      <div className="show-recipes">
        <RecipeCard recipes={currentPosts} loading={loading} />
      </div>
      <div className="show-pages">
        <Paginate
          postsPerPage={postsPerPage}
          totalPosts={recipes.length}
          paginate={paginate}
          nextPage={nextPage}
          previousPage={previousPage}
        />
      </div>
    </div>
  );
};
