import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import CurrentUserContext from "../useContext/CurrentUserContext";

import useCheckUser from '../customerHooks/useCheckUser';

const SingleUser = () => {
    const currentUser = useContext(CurrentUserContext);
    const params = useParams()
    const userName = params.username;
    const [checkUser] = useCheckUser(userName)

    

    return (
        <>
        <ul>
            <li><Link to={`/${currentUser.username}/users/${checkUser.username}/profileInfo`}>{checkUser.username}'s profile</Link></li>
            <li><Link to={`/${currentUser.username}/users/${checkUser.username}/saveList`}>{checkUser.username}'s SavedRecipeList</Link></li>
            <li><Link to={`/${currentUser.username}/users/${checkUser.username}/createList`}>{checkUser.username}'s CreateRecipeList</Link></li>
        </ul>
        </>
    )
}

export default SingleUser;