import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import CurrentUserContext from "./CurrentUserContext";
import { useContext } from "react";

const Profile = () => {
    const currentUser = useContext(CurrentUserContext);
    const userName = useParams().username;
    
    if(currentUser.isAdmin === true) {
       return (
       <div>
        <ul>
            <li><Link to={`/${userName}/signup`}>Create a user</Link></li>
            <li><Link to={`/${userName}/users`}>Get Users</Link></li>
            <li><Link to={`/${userName}/profileInfo`}>Edit File</Link></li>
            <li><Link to={`/${userName}/createRecipe`}>Create Recipe</Link></li>
            <li><Link to={`/${userName}/saveList`}>Edit Saved recipes</Link></li>
            <li><Link to={`/${userName}/createList`}>Edit Created recipes</Link></li>
        </ul>
       </div> 
       )
    }else if(currentUser){
        return (
            <div>
             <ul>
                 <li><Link to={`/${userName}/profileInfo`}>Edit File</Link></li>
                 <li><Link to={`/${userName}/createRecipe`}>Create Recipe</Link></li>
                 <li><Link to={`/${userName}/saveList`}>Edit Saved recipes</Link></li>
                 <li><Link to={`/${userName}/createList`}>Edit Created recipes</Link></li>
             </ul>
            </div> 
            )
    }else{
        return (
        <p>Sorry, you are not allowed to check this information, please log in or register first</p>
    )
    }

    
}

export default Profile;