import logo from './logo.svg';
import './App.css';
import { Routes, Route, BrowserRouter} from "react-router-dom"
import CurrentUserContext from './CurrentUserContext';
import useLocalStorageState from './useLocalStorageState';
import RecipeApi from './RecipeApi';
import React,{ useState, useEffect } from 'react';
import NavBar from './NavBar'
import HomePage from './HomePage';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Categories from './Categories';
import Category from './Category';
import Area from './Area';
import SpecificArea from './SpecificArea';
import {jwtDecode} from 'jwt-decode'
import SingleMeal from './SingleMeal';
import ProfileForm from './ProfileForm';
import Profile from './Profile';
import SaveList from './SaveList';
import CreateList from './CreateList';
import CreateForm from './CreateForm';
import SingleCreateRecipe from './SingleCreateRecipe';
import Ingredient from './Ingredient';
import UserList from './UserList';
import SingleUser from './SingleUser';



function App() {

  const [currentUser, setCurrentUser] = useState('');
  const [token, setToken] = useLocalStorageState("token", '');
  const [currentMeal, setCurrentMeal] = useState('')

  async function signup(data) {
    try{
      let res = await RecipeApi.signup(data);
    setToken(res.token);
    }catch(err){
      alert(err.stack)
    }
  }

  async function login(data) {
    try{
      let res = await RecipeApi.login(data);
      setToken(res.token);
    }catch(e){
      alert(`Invalid username or password`);
    }
   
  }

  async function logout() {
    setToken('');
    setCurrentUser('');
  }

  useEffect(() => {
    async function getCurrentUser() {
      if(token){
      let user = jwtDecode(token);
        let res = await RecipeApi.getUser(user.username)
        console.log(res)
        setCurrentUser(res);
   
      };
    };
    getCurrentUser();
  },[token])

 

  return (
    <div className="App">
     <BrowserRouter>
      <CurrentUserContext.Provider value={currentUser}>
        <NavBar logout={logout} setCurrentMeal={setCurrentMeal}/>
          <Routes>
          <Route path='/' element={<HomePage currentMeal={currentMeal} setCurrentMeal={setCurrentMeal}/>}/>
          <Route path='/login' element={<LoginForm login={login}/>} />
          <Route path='/signup' element={<SignupForm signup={signup}/>} />
          <Route path='/:admin/signup' element={<SignupForm signup={signup}/>} />
          <Route path='/categories'  element={<Categories />} />
          <Route path='/categories/:category' element={<Category />} />
          <Route path='/ingredient/:ingredient' element={<Ingredient />} />
          <Route path='/area' element={<Area />} />
          <Route path='/area/:area' element={<SpecificArea />} />
          <Route path='/:admin/users' element={<UserList logout={logout}/>} />
          <Route path='/:admin/users/:username' element={<SingleUser />}></Route>
          <Route path='/meals/:id' element={<SingleMeal />}/>
          <Route path = '/:username/profile' element={<Profile />}></Route>
          <Route path = '/:username/profileInfo' element={<ProfileForm setCurrentUser={setCurrentUser} />}></Route>
          <Route path = '/:admin/users/:username/profileInfo' element={<ProfileForm setCurrentUser={setCurrentUser} />}></Route>
          <Route path = '/:username/saveList' element={<SaveList />}></Route>
          <Route path = '/:admin/users/:username/saveList' element={<SaveList />}></Route>
          <Route path = '/:admin/users/:username/createList' element={<CreateList />}></Route>
          <Route path = '/:username/createList' element={<CreateList />}></Route>
          <Route path = '/:username/createRecipe' element={<CreateForm />}></Route>
          <Route path = '/:username/createRecipe/:id' element={<SingleCreateRecipe />}></Route>
          
        </Routes>
      </CurrentUserContext.Provider>
     </BrowserRouter>

      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
