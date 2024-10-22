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
    const id = params.id;
    const currentUser = useContext(CurrentUserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [saved,setSaved] = useState(false)
    let blackStar = String.fromCodePoint(0x2605);
    let whiteStar = String.fromCodePoint(0x2606);
    
    useEffect(()=> {
        async function getRecipe() {
           const res = await RecipeApi.meal(id);
           setRecipe(res)
           setIsLoading(false)
        }
       getRecipe();
    },[id])

    async function deleteRecipe(username, recipeId) {
        if(currentUser){
            await RecipeApi.deleteSave(username, recipeId);
        }
    }

    async function save(){
        if(currentUser){
            if(saved) {
               deleteRecipe(currentUser.username,id)
               setSaved(false)
            }else {
               await RecipeApi.saveRecipe(currentUser.username,id);
               setSaved(true)
            }
        }else{
            alert('Please log in first!')
        }
    }

    

    async function checkIfSaved() {
        let result = await RecipeApi.savedRecipeList(currentUser.username);
        let idList = result.map(obj => obj.id)
        if(idList.includes(+id)){
            setSaved(true)
        }else {
            setSaved(false)
        }
        return saved;
    }

    useEffect(() => {
        if(currentUser){
            checkIfSaved()
        }
    },[currentUser])
    

    const longText = recipe.instruction+'';

    return (
        <div className="SingleMeal">
        {isLoading && <Loading />}
        {!isLoading && 
            <div className="SingleMeal-detail">
                <img src={recipe.image}  />
                <h3>{recipe.name}</h3>
                <button onClick={save} > {saved ? blackStar : whiteStar}</button>
                <p><span>Instruction:</span><ReadMore text={longText} maxLength="200"/></p>   
            </div>}
        </div>
    )

}

export default SingleMeal;