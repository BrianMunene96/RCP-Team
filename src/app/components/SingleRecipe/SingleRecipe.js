/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import "./SingleRecipe.css";
import Image from "next/image";
import rating from "../../../../public/assets/rating.jpeg";
import alarm from "../../../../public/assets/alarm.jpeg";
import people from "../../../../public/assets/people.jpeg";
import noRating from "../../../../public/assets/no-rating.jpeg";
import favorite from "../../../../public/assets/favorite.png";
export const SingleRecipe = (props) => {
  const [recipe, setRecipes] = useState([]);

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "b1fda73e9emsh70026538b9aaba3p10ebbejsnfb187dbbd62b",
      "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
    },
  };

  const fetchRecipe = async () => {
    const response = await fetch(
      `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${props.dishId}/information?includeNutrition=true`,
      options
    );
    const recipeInfo = await response.json();
    console.log(recipeInfo);
    setRecipes(recipeInfo);
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  const getIngredients = (recipe) => {
    const ingredients = recipe.extendedIngredients;
    let ingredient = [];
    for (let i = 0; i < ingredients.length; i++) {
      ingredient.push(<li>{ingredients[i].original} </li>);
    }

    return <ul className="ingStyle">{ingredient}</ul>;
  };

  const getInstructions = (recipe) => {
    const instructions = recipe.analyzedInstructions[0].steps;
    let instruction = [];
    for (let i = 0; i < instructions.length; i++) {
      instruction.push(<li> {instructions[i].step}</li>);
    }
    return <ol className="insStyle">{instruction}</ol>;
  };

  const displayRecipe = (recipe) => {
    return (
      <div className="singleRecipe">
        <p className="dishName fontStyle">{recipe.title}</p>
        <div className="dishInfo">
          <Image src={rating} alt="rating" width={80} height={50} />
          <div className="flex gap-3 align-items-center">
            <Image src={alarm} alt="time" width={40} height={40} />
            <p>{recipe.readyInMinutes} min</p>
          </div>
          <div className="flex gap-3 align-items-center">
            <Image src={people} alt="people" width={40} height={40} />
            <p>{recipe.servings} persons</p>
          </div>
        </div>
        <Image
          className="dishImage"
          src={recipe.image}
          alt="Dish pic"
          width={500}
          height={300}
        />
        <p className="fontStyle">Ingredients</p>
        <div>{getIngredients(recipe)} </div>
        <p className="fontStyle">Instructions</p>
        {recipe.analyzedInstructions ? (
          <div>{getInstructions(recipe)} </div>
        ) : (
          <p>No Instructions available...</p>
        )}
        <div className="rateSection">
          <div className="rating">
            <p>Rate</p>
            <Image src={noRating} alt="noRating" width={50} height={20} />
          </div>
          <div className="rating">
            <p>Add to favorite</p>
            <Image src={favorite} alt="favorite" width={50} height={20} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {recipe.title ? <div>{displayRecipe(recipe)} </div> : <p>Loading...</p>}
    </div>
  );
};

export default SingleRecipe;
