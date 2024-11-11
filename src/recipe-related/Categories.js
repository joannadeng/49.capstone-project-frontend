import React,{useState, useEffect} from 'react';
import RecipeApi from '../api/RecipeApi';
import { useNavigate} from "react-router-dom";
import Loading from '../helpers/Loading';
import '../styling/Categories.css'

const Categories = () => {
    const [list, setList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate()
    const [value, setValue] = useState('')

    useEffect(() => {
        async function getCategoriesList() {
          const res = await RecipeApi.categories();
          setList(res);
          setIsLoading(false)
        }
        getCategoriesList();
      },[])

      // select functions
      const handleSelectChange = (e) => {
        navigate(`/categories/${e.target.value}`)
        setValue(e.target.value)
      }

      
        return (
        <div className='Categories'>
            <h2>Search By Categories</h2>
              {isLoading && <Loading />}
              {!isLoading && 
                 <div className='Categories-select'> 
                  <label htmlFor="category-select">Choose a category:</label>
                  <select name="categories" id="category-select" onChange={handleSelectChange}>
                    <option value="">--Please Select a Category--</option>
                    {list.map((cate,idx) => (
                      <option key={idx} value={cate} >{cate}</option>
                    ))}
                  </select>
                </div>
              }
        </div>
      )
}

export default Categories;