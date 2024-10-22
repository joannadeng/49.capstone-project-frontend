import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class RecipeApi {

        // the token for interactive with the API will be stored here.
    static token;
      
    static async request(endpoint, data = {}, method = "get") {
      console.debug("API Call:", endpoint, data, method);
    
          const url = `${BASE_URL}/${endpoint}`;
      const headers = { Authorization: `Bearer ${ window.localStorage.getItem('token')}` };
          const params = (method === "get")
          ? data
              : {};
    
          try {
            return (await axios({ url, method, data, params, headers })).data;
         } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
        throw Array.isArray(message) ? message : [message];
          }
    }

    //signup route
    static async signup(data){
        let res = await this.request('auth/register',data,'post')
        return res;
    }

    // login route
    static async login(data){
        let res = await this.request('auth/token',data,'post')
        return res;
    }

    // save a single recipe
    static async saveRecipe(username,recipeId) {
        let res = await this.request(`users/${username}/savedRecipe/${recipeId}`,{},"post")
        console.log("Saved:",recipeId)
        return res.recipe
    }

    // delete a saved recipe
    static async deleteSave(username,recipeId) {
        await this.request(`users/${username}/savedRecipe/${recipeId}`,{},"delete")
        console.log("Delete:",recipeId)
        return {delete:recipeId}
    }

    // get an array of saved recipes
    static async savedRecipeList(username) {
        let res = await this.request(`users/${username}/savedRecipe`)
        console.log("res:",res.recipes)
        return res.recipes;
    }

    // create a recipe
    static async createRecipe(username,data) {
       let res = await this.request(`users/${username}/createRecipe/`,data,"post")
        console.log("Created")
        return res.recipe;
    }

    // delete a created recipe
    static async deleteCreate(username,recipeId) {
        await this.request(`users/${username}/createRecipe/${recipeId}`,{},"delete")
        console.log("Delete:",recipeId)
        return {delete:recipeId}
    }

    // get created recipe list
    static async createRecipeList(username) {
        let res = await this.request(`users/${username}/createRecipe`)
        console.log(res.recipes)
        return res.recipes;
    }

    // get a single created recipe
    static async singleCreateRecipe(username, recipeId) {
       let res = await this.request(`users/${username}/createRecipe/${recipeId}`)
       console.log("res:",res)
       return res.recipe
    }

    // get categories array 
    static async categories(){
        let res = await axios.get(`${BASE_URL}/recipes/categories`)
        return res.data.categories;
        // return res
    }

    // get area array
    static async area(){
        let res = await axios.get(`${BASE_URL}/recipes/area`)
        console.log(res)
        return res.data.area;
        // return res
    }

    // get specific area recipes
    static async specificArea(area){
        let res = await axios.get(`${BASE_URL}/recipes/area/${area}`)
        return res.data.recipes;
    }

    // get single category recipes 
    static async category(cate){
        let res = await axios.get(`${BASE_URL}/recipes/categories/${cate}`)
        console.log(res.data.recipes)
        return res.data.recipes;
    }

    // get recipes with specific ingredient
    static async ingredient(ingredient){
       
        let res = await axios.get(`${BASE_URL}/recipes/ingredient/${ingredient}`)
        return res.data.recipes;
    }

    // get single recipe  or get a single saved recipe 
    static async meal(id){
        let res = await axios.get(`${BASE_URL}/recipes/${id}`)
        console.log(res.data.recipe)
        return res.data.recipe;
    }

    // get single user info
    static async getUser(username) {
        let res = await this.request(`users/${username}`);
        return res.user;
    }

    // Delete a user
    static async deleteUser(username) {
        await this.request(`users/${username}`,{},'delete')
        return {Deleted: username}
    }

    // get user array info
    static async getUsers() {
        let res = await this.request(`users/`);
        console.log("1111")
        console.log("users:",res.users);
        return res.users;
    }

    // update user
   static async updateUser(username,data){
    let res = await this.request(`users/${username}`,data,'patch')
    return res.user
   }


}

export default RecipeApi;