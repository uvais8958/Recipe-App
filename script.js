const searchBtn=document.querySelector('.searchBtn');
const searchBox=document.querySelector('.searchBox');
const recipeContainer=document.querySelector('.recipe-container');
const recipeDetailsContent=document.querySelector('.recipe-details-content');
const recipeCloseBtn=document.querySelector('.recipe-closeBtn');

//function to get recipe
const fetchRecipe=async(query)=>{
       recipeContainer.innerHTML=`<h2>Fetching Recipes...</h2>`;
          const data= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
          const response= await data.json();
          recipeContainer.innerHTML="";
          response.meals.forEach(meal => {
            console.log(meal);
            const reciDev=document.createElement('div');
            reciDev.classList.add("recipe");
            reciDev.innerHTML=`
            <img src="${meal.strMealThumb}">
            <strong>${meal.strMeal}</strong>
            <p>Area:<span>${meal.strArea}</span> Dish</p>
            <p>Belongs to <span>${meal.strCategory}</span> Category</p>
            `

            const button=document.createElement('button');
            button.textContent="Veiw Recipe";
            reciDev.appendChild(button);
            recipeContainer.appendChild(reciDev);

// Adding addEventListenerto recipe button
           button.addEventListener('click',()=>{
            openRecipePopup(meal);
           })

          });
        
          //   console.log(response.meals[0]);


}

//function to fetch ingredents and measurements
const fetchIngredents=(meal)=>{
let ingredientsList="";
for(let i=1;i<=20;i++){
   const ingredient=meal[`strIngredient${i}`];
   if(ingredient){
      const measure=meal[`strMeasure${i}`];
ingredientsList+=`<li>${measure} ${ingredient}</li>`
   }
   else{
      break;
   }
}
return ingredientsList;

}
const openRecipePopup=(meal)=>{
   recipeDetailsContent.innerHTML=`
   <h2 class="recipeName"> ${meal.strMeal}</h2>
   <h3>Ingredents:</h3>
   <ul class="ingredientList">${fetchIngredents(meal)}</ul>
   <div class="recipeInstructions">
   <h3>Instructions:</h3>
      <p>${meal.strInstructions}</p>
   
</div>
   
   `

   recipeDetailsContent.parentElement.style.display="block";
}

recipeCloseBtn.addEventListener('click',()=>{
   recipeDetailsContent.parentElement.style.display="none";
})






searchBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    // console.log("click button")
    const searchInput=searchBox.value.trim();
    fetchRecipe(searchInput);
})