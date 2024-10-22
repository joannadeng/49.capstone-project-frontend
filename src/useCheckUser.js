import React,{useState, useEffect} from "react";
import RecipeApi from "./RecipeApi";

const useCheckUser = (username) => {
    const [isLoading, setIsLoading] = useState(true);
    const [user,setUser] = useState('')


    useEffect(() => {
        
        async function getCurrentUser() {
           let res = await RecipeApi.getUser(username)
           setUser(res)
        };
        getCurrentUser();
        
      },[])

      return [user,setUser]
}

export default useCheckUser;
