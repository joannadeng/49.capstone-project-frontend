import React,{useState, useEffect} from "react";
import RecipeApi from "./RecipeApi";

const useCheckUser = (username) => {
    const [user,setUser] = useState('');

    useEffect(() => {
        
        async function getUser() {
           let res = await RecipeApi.getUser(username)
           setUser(res)
        };
        getUser();
        
      },[])

      return [user,setUser]
}

export default useCheckUser;
