import React,{ useContext, useState, useEffect} from 'react';
import CurrentUserContext from "./CurrentUserContext";
import RecipeApi from './RecipeApi';
import { Link, useParams} from "react-router-dom";
import './SaveList.css'

const SaveList = () => {
    const currentUser = useContext(CurrentUserContext);
    const [res, setRes] = useState([]);
    const [isValid, setIsValid] = useState(true)
  
    


    async function getSaveList(user) {
         let result = await RecipeApi.savedRecipeList(user);
         console.log("result here:",result)
          setRes(result);
          if(result.length === 0) {
            setIsValid(false)
          }
        }

    async function deleteRecipe(username, recipeId) {
        if(currentUser){
            await RecipeApi.deleteSave(username, recipeId);
        }
        await getSaveList(currentUser.username);
    }

    useEffect(()=>{
        if(currentUser){
            getSaveList(currentUser.username);  
        }     
    },[JSON.stringify(res),currentUser])

        return (
        <div className='SaveList'>
            <h3>Let's see what you like~~~</h3>
        {isValid ? ((res.map((obj,idx) => (
            <div key={idx} className='SaveList-item'>
               <span className='SaveList-item-span'> <Link to={`/meals/${obj.id}`}>{obj.name}</Link></span>
               <button className='SaveList-item-btn' onClick={() => deleteRecipe(currentUser.username, obj.id)}>Delete</button>
            </div>
        )))) :  (<div>
                <p>Oops, you haven't saved any recipe yet, <Link to='/'>go browse~~</Link></p>
             </div>)}
        </div>
       )  
}

export default SaveList;