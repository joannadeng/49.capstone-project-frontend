import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './HomePage.css'


function HomePage() {

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
    return (
        <div className="HomePage overlay">
            <h1 className="HomePage-h1" >Recipes</h1>
            <h3 className="HomePage-p" >All free Recipes you can find here</h3>
            {/* <button className="HomePage-btn" onClick={() => navigate('categories')}>Search By Categories</button> 
            <button className="HomePage-btn" onClick={() => navigate('area')}>Search By Area</button>  */}
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
        </div>
    )
}

export default HomePage;