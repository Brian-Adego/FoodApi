const searchForm = document.querySelector("form");
let searchInput = "";
const foodContainer = document.querySelector(".food-container");
const APP_ID = "e81a0638";
const APP_KEY = "0afa792f882c1845fe39c7708901b3ef";

searchForm.addEventListener("submit", (e) => {
	e.preventDefault();
	searchInput = e.currentTarget.querySelector("input").value;
	fetchApi();
});

async function fetchApi() {
    const BASE_URL = `https://api.edamam.com/search?q=${searchInput}&app_id=${APP_ID}&app_key=${APP_KEY}&to=20`;
    const response = await fetch(BASE_URL);
    const data = await response.json();
    generateHTML(data.hits);
    console.log(data);
}

function generateHTML(data) {
    let generatedHTML = "";
    data.map(datae => {
        generatedHTML += `
        <div class="foods">
			<div class="food-image">
				<img
				    src="${datae.recipe.image}"
					/>
			</div>
				<div class="food-details">
					<p class="food-name">${datae.recipe.label}</p>
					<p class="food-net">${datae.recipe.totalWeight.toFixed(0) / 1000} Kgs</p>
                    <a href="${datae.recipe.url}" target="_blank" class="food-recipe">Recipe</a>
                </div>
		</div>
        `
    })
    foodContainer.innerHTML = generatedHTML;
}
