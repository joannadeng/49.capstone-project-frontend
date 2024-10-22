import { useParams,Link } from "react-router-dom";
import {useEffect, useState} from "react"
import RecipeApi from "./RecipeApi";
import Loading from './Loading';
import './SpecificArea.css'

const SpecificArea = () => {
    const [recipes, setRecipes] = useState([]);
    const params = useParams();
    const area = params.area;
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function getAreaList() {
          const res = await RecipeApi.specificArea(area);
          setRecipes(res);
          setIsLoading(false)
        }
        getAreaList();
      },[area])
   
        return (
            <>
            <div>
            {isLoading && <Loading />}
            {!isLoading && 
                       <div className="SpecificArea">
                        {recipes.map((obj,idx) => (
                            <div key={idx} className="SpecificArea-item">
                                <img src={obj.strMealThumb} width="200" height="200"/>
                                <p> <Link to={`/meals/${obj.idMeal}`}>{obj.strMeal}</Link></p>
                            </div>
                        ))}
                      </div>}
            </div>
            </>
      )
}

export default SpecificArea;

