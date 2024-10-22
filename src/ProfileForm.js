import React,{ useContext } from 'react';
import CurrentUserContext from "./CurrentUserContext";
import RecipeApi from './RecipeApi';
import './ProfileForm.css'
import { useNavigate, useParams } from 'react-router-dom';
import useCheckUser from './useCheckUser';


const ProfileForm = ({setCurrentUser}) => {
    const currentUser = useContext(CurrentUserContext);
    const params = useParams();
    const userName = params.username;
    const [checkUser, setCheckUser] = useCheckUser(userName)
    
    console.log("checkUser:",checkUser)

    async function updateCurrUserInfo(username, data) {
      let updatedUser= await RecipeApi.updateUser(username,data);
      await setCheckUser(updatedUser)
      await setCurrentUser(updatedUser);
      console.log("currentUser:",currentUser)
    }

    async function updateCheckUserInfo(username, data) {
      let updatedUser= await RecipeApi.updateUser(username,data);
      await setCheckUser(updatedUser);
      console.log("checkUser:",checkUser)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(currentUser.username === userName) {
          setCheckUser(currentUser);
          const {firstName,lastName,email} = checkUser;
          if(firstName !== '' && lastName !=='' && email !=='') {
            let updatedProfileData = {firstName,lastName,email};
            updateCurrUserInfo(currentUser.username, updatedProfileData);
            alert("Successfully Updated");
            
          }else{
            alert('FirstName/LastName/Email cant be empty')
          }
        }else if(currentUser.isAdmin === true) {
          const {firstName,lastName,email} = checkUser;
          if(firstName !== '' && lastName !=='' && email !=='') {
            let updatedProfileData = {firstName,lastName,email};
            updateCheckUserInfo(checkUser.username, updatedProfileData)
            alert("Successfully Updated");
          }else{
            alert('FirstName/LastName/Email cant be empty')
          }
        }
    }

    const handleChange = (e) => {
        const {name,value} = e.target;
        setCheckUser(data => ({
            ...data,
            [name]:value
        }))
    }

    return (
     <div className='ProfileForm'>
        <form className="ProfileForm-body" onSubmit={handleSubmit}>
          <label className="ProfileForm-label" htmlFor="username">Username</label>
          <input
            className='ProfileForm-input'
            id="username"
            name="username"
            type="text"
            readOnly="readonly"
            value={checkUser.username}
          />
         

          <label className="ProfileForm-label" htmlFor="firstName">First Name</label>
          <input
            className='ProfileForm-input'
            id="firstName"
            name="firstName"
            type="text"
            onChange={handleChange}
            value={checkUser.firstName}
          />
    
          <label className="ProfileForm-label" htmlFor="lastName">Last Name</label>
          <input
            className='ProfileForm-input'
            id="lastName"
            name="lastName"
            type="text"
            onChange={handleChange}
            value={checkUser.lastName}
          />
         
          <label className="ProfileForm-label" htmlFor="email">Email</label>
          <input
            className='ProfileForm-input'
            id="email"
            name="email"
            type="email"
            onChange={handleChange}
            value={checkUser.email}
          />
          <button className='ProfileForm-btn' >Save</button>
        </form>

        </div>
      );
}

export default ProfileForm;