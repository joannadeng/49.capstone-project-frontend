import React, {useContext} from "react";
import {NavLink} from "react-router-dom";
import {Navbar} from "reactstrap";
import CurrentUserContext from "./CurrentUserContext";
import './NavBar.css'

const NavBar = ({logout}) => {
    const currentUser = useContext(CurrentUserContext);

    if(currentUser){
        return (
            <div className="Navbar">
              <div >
                <Navbar >
                    
                    {/* <button className="HomePage-btn" onClick={() => navigate('categories')}>Search By Categories</button>  */}
            {/* <button className="HomePage-btn" onClick={() => navigate('area')}>Search By Area</button>  */}
                 <ul className="Navbar-left">
                    <li><NavLink to='/' >Free Recipes</NavLink></li>
                    <li><NavLink to='/categories'>Categories </NavLink></li>
                    <li><NavLink to='/area' >Area </NavLink></li>
                 </ul>
                </Navbar>
              </div>
              <div  className="Navbar-right">
                <Navbar >
                    <ul>
                        {/* <li><NavLink to={`/${currentUser.username}/createRecipe`}>Create Recipe</NavLink></li> */}
                        <li><NavLink to={`/${currentUser.username}/profile`}>Profile </NavLink></li>
                        <li><NavLink to='/' onClick={logout}>Log out {currentUser.username} </NavLink></li>
                    </ul>
                </Navbar>
              </div>
            </div>
        )
    }
    return (
        <div className="Navbar">
          <div >
           <Navbar >
              <ul className="Navbar-left">
                    <li><NavLink to='/' >Free Recipes</NavLink></li>
                    <li><NavLink to='/categories'>Categories </NavLink></li>
                    <li><NavLink to='/area' >Area </NavLink></li>
              </ul>
            </Navbar>
          </div>
        <div className="Navbar-right">
            <Navbar >
                <ul>
                   <li><NavLink to='/login' > Log in  </NavLink></li>
                   <li><NavLink to='/signup' > Sign up </NavLink></li>
                </ul>
                
            </Navbar>
        </div>
        </div>
    )
}

export default NavBar;