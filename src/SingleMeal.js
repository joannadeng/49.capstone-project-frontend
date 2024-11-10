import React, { useEffect, useState, useContext} from "react";
import { useParams } from "react-router-dom";
import RecipeApi from "./RecipeApi";
import CurrentUserContext from "./CurrentUserContext";
import ReadMore from "./ReadMore";
import Loading from './Loading';
import './SingleMeal.css'


const SingleMeal =() => {
    const [recipe, setRecipe] = useState('')
    const params = useParams();
    const recipeId = params.id;
    
    const currentUser = useContext(CurrentUserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [saved,setSaved] = useState(false)
    let blackStar = String.fromCodePoint(0x2605);
    let whiteStar = String.fromCodePoint(0x2606);
    
    useEffect(()=> {
        async function getRecipe() {
           const res = await RecipeApi.meal(recipeId);
           setRecipe(res)
           setIsLoading(false)
        }
       getRecipe();
    },[recipeId])

    async function deleteRecipe(username, id) {
        if(currentUser){
            await RecipeApi.deleteSave(username, id);
        }
    }

    async function findSavedRecipe(recipeId) {
        if(currentUser){
            let result = await RecipeApi.savedRecipeList(currentUser.username);
            console.log("result:",result)
            let recipe = result.find(res => {
               return +res.recipeid === +recipeId
            })  
            if (recipe) {
                console.log("recipe:",recipe.id)
                return recipe.id
            }
        }
    }

    async function save(){
        if(currentUser){
            if(saved) {
               let id = await findSavedRecipe(recipeId);
               deleteRecipe(currentUser.username,id);
               setSaved(false)
            }else {
               await RecipeApi.saveRecipe(currentUser.username,recipeId);
               
               setSaved(true)
            }
        }else{
            alert('Please log in first!')
        }
    }

    useEffect(() => {
        if(currentUser){
            checkIfSaved()
        }
    },[currentUser,recipe,save])

    async function checkIfSaved() {
        let result = await RecipeApi.savedRecipeList(currentUser.username);
        let idList = await result.map(obj => obj.recipeid)
        if(idList.includes(+recipeId)){
            setSaved(true)
        }else {
            setSaved(false)
        }
        return saved;
    }

    
    

    const longText = recipe.instruction+'';

    return (
        <div className="SingleMeal">
        {isLoading && <Loading />}
        {!isLoading && 
            <div className="SingleMeal-detail">
                <img src={recipe.image}  />
                <h3>{recipe.name}</h3>
                <button onClick={save} > 
                    {saved ? blackStar : whiteStar}</button>
                <p><span>Instruction:</span><ReadMore text={longText} maxLength="200"/></p>   
            </div>}
        </div>
    )

}

export default SingleMeal;