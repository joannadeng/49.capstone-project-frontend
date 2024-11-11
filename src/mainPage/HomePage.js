import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styling/HomePage.css'
import RecipeApi from "../api/RecipeApi";
import ReadMore from "../helpers/ReadMore";


function HomePage({currentMeal,setCurrentMeal}) {

  const navigate = useNavigate()
  const [value,setValue] = useState('');
    
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!value){
        alert('Please enter a valid ingredient!')
        return;
    }
    navigate(`/ingredient/${value}`);
    setValue('')

  }

  const handleChange = (e) => {
   setValue(e.target.value)
  }

  async function random(){
    let res = await RecipeApi.getRandom();
    console.log("ressss:",res)
    setCurrentMeal(res)
  }


  const longText = currentMeal.strInstructions+'';
    return (
        <>
        {!currentMeal &&
        <div className="HomePage">
            <h1 className="HomePage-h1" >Want to be a Chef ? Come check on us~~</h1>
            <h3 className="HomePage-p" >All free Recipes you can find here</h3>
            <form className="HomePage-form" onSubmit={handleSubmit}>
                <label htmlFor="ingredient">Search By Ingredient</label>
                <input
                id="ingredient"
                type="text"
                placeholder="Enter an ingredient..."
                name="ingredient"
                value={value}
                onChange={handleChange}
                className="HomePage-form-input"
                />
                <button className="HomePage-form-btn">Search</button>
            </form>
             <div><button className="HomePage-random-btn" onClick={random}>Pick a meal for me</button></div>
        </div>
       
        }
            
            
            <div className="HomePage-random">
            <div><button className="HomePage-random-btn" onClick={random}>Pick a meal for me</button></div>
                {currentMeal && 
                <ul className="HomePage-randam">
                    <li><span>{currentMeal.strMeal}</span></li>
                    <li><span>Area: {currentMeal.strArea}</span></li>
                    <li><span>Category: {currentMeal.strCategory}</span></li>
                    <li><span>Instruction:</span><ReadMore text={longText} maxLength="500"/></li>
                </ul>}
            </div>
            
        {/* </div> */}
          </>
    )
}

export default HomePage;