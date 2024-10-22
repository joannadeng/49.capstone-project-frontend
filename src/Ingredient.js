import { useParams,Link,useNavigate} from "react-router-dom";
import {useEffect, useState} from "react"
import RecipeApi from "./RecipeApi";
import Loading from './Loading';
import './Ingredient.css'

const Ingredient = () => {
   
    const [recipes, setRecipes] = useState([])
    const params = useParams();
    const ingr = params.ingredient;
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate()

    useEffect(()=> {
        async function getIngredient() {
           const res = await RecipeApi.ingredient(ingr);
           if(res === null){
            // console.log("111")
            // alert("Oops, don't have recipe for this ingredient right now, maybe you can make one") why it re-render twice?
            navigate('/')
           }
           setRecipes(res)
           setIsLoading(false)
        }
       getIngredient();
    },[ingr])


    return (
        <>
        <div>
        {isLoading && <Loading />}
        {!isLoading && 
               <div className="ingredient">
                {recipes.map((obj,idx) => (
                   <div className="ingredient-item" key={idx}>
                      <img src={obj.strMealThumb} width="200" height="200"/>
                      <p> <Link to={`/meals/${obj.idMeal}`}>{obj.strMeal}</Link></p>
                   </div>
               ))}
              </div>}
        </div>
        
        </>
    )
}

export default Ingredient;
