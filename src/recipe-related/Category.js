import { useParams,Link } from "react-router-dom";
import {useEffect, useState} from "react"
import RecipeApi from "../api/RecipeApi";
import Loading from '../helpers/Loading';
import '../styling/Category.css'

const Category = () => {
   
    const [recipes, setRecipes] = useState([])
    const params = useParams();
    const type = params.category;
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=> {
        async function getCategory() {
           const res = await RecipeApi.category(type);
           setRecipes(res)
           setIsLoading(false)
        }
       getCategory();
    },[type])


    return (
        <>
        <div >
        {isLoading && <Loading />}
        {!isLoading && 
               <div className='Category'>
                {recipes.map((obj,idx) => (
                   <div key={idx} className='Category-item'>
                      <img src={obj.strMealThumb} width="200" height="200"/>
                      <p > <Link to={`/meals/${obj.idMeal}`}>{obj.strMeal}</Link></p>
                   </div>
               ))}
              </div>}
        </div>
        
        </>
    )
}

export default Category;
