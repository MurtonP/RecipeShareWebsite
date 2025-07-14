import React from 'react';

function RecipeDetails({ recipe }) {
  if (!recipe) return null;

  // Split ingredients and steps by "|"
  const ingredients = recipe.ingredients
    ? recipe.ingredients.split('|')
    : [];
  const instructions = recipe.steps
    ? recipe.steps.split('|')
    : [];

  return (
    <div className="recipe-details">
      <h3>{recipe.title || 'Recipe Details'}</h3>
      <p><strong>Ingredients:</strong></p>
      <ul>
        {ingredients.map((ing, idx) => (
          <li key={idx}>{ing.trim()}</li>
        ))}
      </ul>
      <p><strong>Instructions:</strong></p>
      <ol>
        {instructions.map((step, idx) => (
          <li key={idx}>{step.trim()}</li>
        ))}
      </ol>
      <p><strong>Cooking Time:</strong> {recipe.cookingTime}</p>
      <p><strong>Dietary Tags:</strong> {recipe.dietaryTags}</p>
    </div>
  );
}

export default RecipeDetails;