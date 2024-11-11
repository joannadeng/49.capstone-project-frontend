import React,{ useContext, useState, useEffect} from 'react';
import CurrentUserContext from "../useContext/CurrentUserContext";
import RecipeApi from '../api/RecipeApi';
import { Link, useParams} from "react-router-dom";
import '../styling/SaveList.css'

const SaveList = () => {
    const currentUser = useContext(CurrentUserContext);
    const [res, setRes] = useState([]);
    const [isValid, setIsValid] = useState(true);
    const params = useParams();
    const userName = params.username;

    async function getSaveList(user) {
         let result = await RecipeApi.savedRecipeList(user);
         console.log("result here:",result)
          setRes(result);
          if(result.length === 0) {
            setIsValid(false)
          }
    }

    async function deleteRecipe(id) {
        if(currentUser.username === userName){
            await RecipeApi.deleteSave(currentUser.username, id);
            await getSaveList(currentUser.username);
        }else if(currentUser.isAdmin === true){
            await RecipeApi.deleteSave(userName, id);
            await getSaveList(userName);
        }else{
            alert('Please login or register first')
        } 
    }

    useEffect(()=>{
        if(currentUser.username === userName){
            getSaveList(currentUser.username);  
        }else if(currentUser.isAdmin === true){
            getSaveList(userName)
        }else{
            alert('Please login or register first')
        }    
    },[JSON.stringify(res),currentUser,userName])

        return (
        <div className='SaveList'>
            <h3>Let's see what you like~~~</h3>
        {isValid ? ((res.map((obj,idx) => (
            <div key={idx} className='SaveList-item'>
               <span className='SaveList-item-span'> <Link to={`/meals/${obj.recipeid}`}>{obj.name}</Link></span>
               <button className='SaveList-item-btn' onClick={() => deleteRecipe(obj.id)}>Delete</button>
            </div>
        )))) :  (<div>
                <p>Oops, you haven't saved any recipe yet, <Link to='/'>go browse~~</Link></p>
             </div>)}
        </div>
       )  
}

export default SaveList;