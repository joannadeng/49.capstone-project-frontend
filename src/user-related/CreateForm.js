import React, {useContext} from "react";
import { useFormik } from 'formik';
import { useNavigate } from "react-router-dom";
import RecipeApi from "../api/RecipeApi";
import CurrentUserContext from "../useContext/CurrentUserContext";
import '../styling/CreateForm.css'

const validate = values => {
    const errors = {};
    if(!values.name) {
        errors.name = 'Required';
    }
    if(!values.ingredient) {
        errors.ingredient = 'Required';
    }

    if(!values.instruction) {
        errors.instruction = 'Required';
    }

    return errors;
};

async function createRec(username,data){
    await RecipeApi.createRecipe(username,data);
}


const CreateForm = () => {
    const currentUser = useContext(CurrentUserContext);
    
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues:{
            name:'',
            ingredient:'',
            instruction:''
        },
        validate,
        onSubmit: values => {
            createRec(currentUser.username,values);
            navigate(`/${currentUser.username}/createList`);
        },
    });

    return (
        <div className="createform">
        <form className="createform-body" onSubmit={formik.handleSubmit}>
            <label className="createform-label" htmlFor="name">Name</label>
            <input
            className="createform-input"
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
            />
          {formik.errors.name ? <div>{formik.errors.name}</div> : null}

            <label className="createform-label" htmlFor="ingredient">Ingredient</label>
            <input
            className="createform-input"
            id="ingredient"
            name="ingredient"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.ingredient}
            />
          {formik.errors.ingredient ? <div>{formik.errors.ingredient}</div> : null}

          <label className="createform-label" htmlFor="instruction">Instruction</label>
            <textarea
            className="createform-textarea"
            id="instruction"
            name="instruction"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.instruction}
            cols="50" 
            rows="10"
            />
          {formik.errors.instruction ? <div>{formik.errors.instruction}</div> : null}
          <button className="createform-btn">Submit</button>
        </form>
        </div>
    )
}

export default CreateForm;