import React,{ useContext, useState,useEffect} from 'react';
import CurrentUserContext from "./CurrentUserContext";
import RecipeApi from './RecipeApi';
import { Link , Navigate} from "react-router-dom";
import './CreateList.css'

const CreateList = () => {
    const currentUser = useContext(CurrentUserContext);
    const [recipes, setRecipes] = useState([]);
    const [isValid, setIsValid] = useState(true)

    async function getCreateList(username) {
        let recipes = await RecipeApi.createRecipeList(username);
        setRecipes(recipes)
        if(recipes.length === 0){
            setIsValid(!isValid)
        }
    }

    async function deleteRecipe(username, recipeId) {
        if(currentUser){
            await RecipeApi.deleteCreate(username, recipeId);
        }
        await getCreateList(currentUser.username);
    }

    useEffect(() => {
        if(currentUser){
             getCreateList(currentUser.username);
        }
    },[JSON.stringify(recipes),currentUser])

    

        return (
        <div className='CreateList'>
            <h3>Let's see what you made~~~<Link to={`/${currentUser.username}/createRecipe`}>create more</Link></h3>
        {isValid ? (recipes.map((obj,idx) => (
            <li key={idx} className='CreateList-item'>
                
               <span className='CreateList-item-span'> <Link to={`/${currentUser.username}/createRecipe/${obj.id}`}>{obj.name}</Link></span>
               <button className='CreateList-item-btn' onClick={() => deleteRecipe(currentUser.username, obj.id)}>Delete</button>
            </li>
        ))) : (<div>
            <p>Oops, you haven't created any recipe yet, <Link to={`/${currentUser.username}/createRecipe`}>go make one~~</Link></p>
        </div>)}
        </div>
       )
}

export default CreateList;