import React, { useContext, useEffect, useState } from "react";
import CurrentUserContext from "./CurrentUserContext";
import RecipeApi from "./RecipeApi";
import { Link, useNavigate, useParams } from  "react-router-dom"

const UserList = ({logout}) => {
    const currentUser = useContext(CurrentUserContext);
    const [userList, setUserList] = useState([]);
    const params = useParams()
    const userName = params.username;
    const navigate = useNavigate()
    
     
    async function getUserList() {   
            let users = await RecipeApi.getUsers()
            console.log(users)
            setUserList(users); 
    }

    async function deleteUser(username) {
        
        await RecipeApi.deleteUser(username)
        if(currentUser.username === username){
            setUserList([]);
            logout();
            navigate('/')
            
        }
        getUserList()
    }

    

    useEffect(()=>{
        if(currentUser.isAdmin === true ){
        getUserList()
        }  
    },[currentUser,userList])

  


    return (
        <div>
        <ul>
            {userList.map((user,idx) => (
                // <li key={idx}><Link to={`/${currentUser.username}/users/${user.username}/profileInfo`}>{user.username}'s profile</Link></li>
                <div>
                <li key={idx}><Link to={`/${currentUser.username}/users/${user.username}`}>{user.username}</Link></li>
                <button onClick={()=>{deleteUser(user.username)}}>
                    Delete
                </button>
                </div>
            ))}
        </ul>
        </div>
    )
}

export default UserList;