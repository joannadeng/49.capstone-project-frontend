import React,{useState, useEffect} from 'react';
import RecipeApi from '../api/RecipeApi';
import {useNavigate} from "react-router-dom";
import Loading from '../helpers/Loading';
import '../styling/Area.css'

const Area = () => {
    const [list, setList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const [value, setValue] = useState('')

    useEffect(() => {
        async function getAreaList() {
          const res = await RecipeApi.area();
          setList(res);
          setIsLoading(false)
        }
        getAreaList();
      },[])

    // select functions
    const handleSelectChange = (e) => {
      navigate(`/area/${e.target.value}`)
      setValue(e.target.value);
    }

      return (
        <div className='Area'>
            <h2>Search By Area</h2>
              {isLoading && <Loading />}
              {!isLoading && 
                 <div className='Area-select'> 
                  <label htmlFor="category-select">Choose a area:</label>
                  <select name="categories" id="category-select" onChange={handleSelectChange}>
                    <option value="">--Please Select a Area--</option>
                    {list.map((area,idx) => (
                      <option key={idx} value={area} >{area}</option>
                    ))}
                  </select>
                </div>
              }
        </div>
      )
}

export default Area;