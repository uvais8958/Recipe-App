const searchBtn=document.querySelector('.searchBtn');
const searchBox=document.querySelector('.searchBox');
const recipeCounter=document.querySelector('.recipe-container');


//function to get recipe
const fetchRecipe=async(query)=>{
          const data= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
          const response= await data.json();
          console.log(response.meals[0]);

}

searchBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    // console.log("click button")
    const searchInput=searchBox.value.trim();
    fetchRecipe(searchInput);
})