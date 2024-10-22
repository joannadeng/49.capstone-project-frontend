import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import CurrentUserContext from "./CurrentUserContext";

import useCheckUser from './useCheckUser';

const SingleUser = () => {
    const currentUser = useContext(CurrentUserContext);
    const params = useParams()
    const userName = params.username;
    const [checkUser, setCheckUser] = useCheckUser(userName)

    

    return (
        <>
        <ul>
            <li><Link to={`/${currentUser.username}/users/${checkUser.username}/profileInfo`}>{checkUser.username}'s profile</Link></li>
            <li><Link to={`/${currentUser.username}/users/${checkUser.username}/profileInfo`}>{checkUser.username}'s SavedRecipeList</Link></li>
            <li><Link to={`/${currentUser.username}/users/${checkUser.username}/profileInfo`}>{checkUser.username}'s CreateRecipeList</Link></li>
        </ul>
        </>
    )
}

export default SingleUser;