import React, { useEffect, useState, useContext} from "react";
import { useParams,useNavigate } from "react-router-dom";
import RecipeApi from "./RecipeApi";
import CurrentUserContext from "./CurrentUserContext";
import ReadMore from "./ReadMore";
import Loading from './Loading';

const SingleCreateRecipe = () => {
    const [recipe, setRecipe] = useState('')
    const params = useParams();
    const id = params.id;
    const currentUser = useContext(CurrentUserContext);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
  
    
    useEffect(()=> {
        async function getRecipe() {
            if(currentUser){
                const res = await RecipeApi.singleCreateRecipe(currentUser.username, id);
                setRecipe(res)
                setIsLoading(false)
            }
        }
       getRecipe();
    },[id])

    async function deleteRecipe(username, recipeId) {
        if(currentUser){
            await RecipeApi.deleteCreate(username, recipeId);
            navigate(`/${currentUser.username}/createList`)
        }
    }
    

    const longText = recipe.instruction+'';

    return (
        <>
        {isLoading && <Loading />}
        {!isLoading && 
            <div>
                {/* <img src={recipe.image} width="500" /> */}
                <h4>{recipe.name}</h4>
                <ReadMore text={longText} maxLength="200"/>   
                <button onClick={() => deleteRecipe(currentUser.username, id)}>Delete</button>
            </div>}
        </>
    )
}

export default SingleCreateRecipe;