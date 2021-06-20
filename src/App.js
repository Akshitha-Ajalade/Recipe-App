import React,{useEffect, useState} from "react";
import "./App.css";
import Recipe from "./Recipe";

export default function App() {

  const APP_ID = "5ce58598";
  const APP_KEY = "ed6d2d293fd2c8e97344c580c76b8658";

  const [recipe, setRecipe] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");

useEffect(()=>
{
  getRecipes();
},[query])

const getRecipes = async ()=>
{
  const response = await fetch(`https://api.edamam.com/search?q=${query}&&app_id=${APP_ID}&app_key=${APP_KEY}`);
  const data = await response.json();
  setRecipe(data.hits);
  console.log(data.hits);
}

const updateSearch = (e)=>{
  setSearch(e.target.value);
}

const getSearch = (e)=>{
  e.preventDefault();
  setQuery(search);
  setSearch("");
}

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange = { updateSearch } />
        <button className="search-button" type="submit">search</button>
      </form>

      <div className="recipes">
      {recipe.map((recipe) => (
        <Recipe 
        key={recipe.recipe.label} title = {recipe.recipe.label}
                calories = {recipe.recipe.calories}
                images = {recipe.recipe.image} 
                ingredients = { recipe.recipe.ingredients } />
      ))}
      </div>
    </div>
  )
}
