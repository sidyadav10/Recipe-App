let container = document.querySelector(".container");
let search_btn = document.querySelector(".search_btn")
let search_input = document.querySelector("#input");

async function getRecipe(query){
    let data = await fetch(`https://wWw.themealdb.com/api/json/v1/1/search.php?s=${query}`);
if (data.ok) {
    let response = await data.json();
    console.log(response.meals)
    container.innerHTML = "";
    if (response.meals !== null) {
        response.meals.forEach(meal => {
            let recipe_div = document.createElement("div");
            recipe_div.classList.add("recipe");
            recipe_div.innerHTML = `
            <img src="${meal.strMealThumb}">
            <h1>${meal.strMeal}</h1>
            <h4>${meal.strArea}<span>${meal.strCategory}</span></h4>
            <button class = "recipe_btn">View</button>
            `;
            // Add more code to handle ingredients, if needed
            let showRecipe = document.createElement("div");
            showRecipe.classList.add("show_recipe");
            let heading = document.createElement("h1");
            heading.textContent =`${meal.strMeal}`
            let ingredientsList = document.createElement("ul");
            for(let i = 1;meal[`strIngredient${i}`];i++){
               let ingredient = meal[`strIngredient${i}`];
               let measure = meal[`strMeasure${i}`];
               if (ingredient && measure) {
                let listItem = document.createElement("li");
                listItem.classList.add("recipe_item")
                listItem.textContent = `${measure} ${ingredient}`;
                ingredientsList.appendChild(listItem);
            }
            
        }
        let instruction = document.createElement("p");
        instruction.textContent = `${meal.strInstructions}`
        let closeBtn = document.createElement("div");
        closeBtn.classList.add("close")
        
        
        showRecipe.append(heading,ingredientsList,instruction,closeBtn);
        recipe_div.append(showRecipe)
            container.append(recipe_div);
            
            
            
        });
    } else {
        container.innerHTML = `<h1>Item not found</h1>`;
    }
} else {
    container.innerHTML = "Something went wrong while fetching data";
}
viewRecipe()
closeRecipe()

}



search_btn.addEventListener("click",()=>{
    let search = search_input.value.trim();
    if(search !== ""){
        
        getRecipe(search)
    }else{
        alert("Enter something to search")
    }
    
})

function viewRecipe(){
    let recipe = document.querySelectorAll(".recipe_btn");
    for(let recipe_btn of recipe){
        recipe_btn.addEventListener("click",(e)=>{
            let target = e.target.parentElement;
            // console.log(target)
            target.classList.add("viewBtn")
            
        })
    } 
}

function closeRecipe(){
    let closeBtn = document.querySelectorAll(".close");
    for(let btn of closeBtn ){
        btn.addEventListener("click",(e)=>{
            let target = e.target.parentElement.parentElement;
            console.log(target)
            target.classList.remove("viewBtn")
        })
    }
}