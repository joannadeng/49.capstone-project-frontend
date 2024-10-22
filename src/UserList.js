import React, { useContext, useEffect, useState } from "react";
import CurrentUserContext from "./CurrentUserContext";
import RecipeApi from "./RecipeApi";
import { Link, useNavigate } from  "react-router-dom";
import './UserList.css'

const UserList = ({logout}) => {
    const currentUser = useContext(CurrentUserContext);
    const [userList, setUserList] = useState([]);
    const navigate = useNavigate(); 
     
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
    },[currentUser])

    return (
        <div className="userList">
        <ul className="userList-ul">
            {userList.map((user,idx) => (
                <div className="userList-user">
                <li key={idx}><Link to={`/${currentUser.username}/users/${user.username}`}>{user.username}</Link></li>
                <button  className="userList-button"  onClick={()=>{deleteUser(user.username)}}>
                    Delete
                </button>
                </div>
            ))}
        </ul>
        </div>
    )
}

export default UserList;