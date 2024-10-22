import React,{ useContext, useState,useEffect} from 'react';
import CurrentUserContext from "./CurrentUserContext";
import RecipeApi from './RecipeApi';
import { Link , useParams} from "react-router-dom";
import './CreateList.css'

const CreateList = () => {
    const currentUser = useContext(CurrentUserContext);
    const [recipes, setRecipes] = useState([]);
    const [isValid, setIsValid] = useState(true);
    const params = useParams();
    const userName = params.username;

    async function getCreateList(username) {
        let recipes = await RecipeApi.createRecipeList(username);
        setRecipes(recipes)
        if(recipes.length === 0){
            setIsValid(!isValid)
        }
    }

    async function deleteRecipe(recipeId) {
        if(currentUser.username === userName){
            await RecipeApi.deleteCreate(currentUser.username, recipeId);
            await getCreateList(currentUser.username);
        }else if(currentUser.isAdmin === true){
            await RecipeApi.deleteCreate(userName, recipeId);
            await getCreateList(userName);
        }else{
            alert('Please login or register first')
        } 
    }

    useEffect(()=>{
        if(currentUser.username === userName){
            getCreateList(currentUser.username);  
        }else if(currentUser.isAdmin === true){
            getCreateList(userName)
        }else{
            alert('Please login or register first')
        }    
    },[JSON.stringify(recipes),currentUser,userName])

    

        return (
        <div className='CreateList'>
            <h3>Let's see what you made~~~<Link to={`/${currentUser.username}/createRecipe`}>create more</Link></h3>
        {isValid ? (recipes.map((obj,idx) => (
            <li key={idx} className='CreateList-item'>
                
               <span className='CreateList-item-span'> <Link to={`/${currentUser.username}/createRecipe/${obj.id}`}>{obj.name}</Link></span>
               <button className='CreateList-item-btn' onClick={() => deleteRecipe(obj.id)}>Delete</button>
            </li>
        ))) : (<div>
            <p>Oops, you haven't created any recipe yet, <Link to={`/${currentUser.username}/createRecipe`}>go make one~~</Link></p>
        </div>)}
        </div>
       )
}

export default CreateList;