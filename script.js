const randomRecipeBtn = document.getElementById('randomRecipeBtn');
imageContainer = document.getElementById('imageContainer');
videoContainer = document.getElementById('videoContainer');
foodImage = document.getElementById('foodImage');

randomRecipeBtn.addEventListener('click', (event) => {
	var els = document.querySelectorAll("h2, h3");
	for (var i=0; i < els.length; i++) {
	    els[i].setAttribute('style','visibility:visible');
	}
	fetch('https://www.themealdb.com/api/json/v1/1/random.php')
		.then(res => res.json())
		.then(res => {
		getRecipeID(res.meals[0], event);
	});
});

const getRecipeID = (meal, event) => {
	recipeID=`${meal.idMeal}`;
	event.preventDefault();
	window.location = window.location.href.split('?')[0]+"?id="+recipeID;
}

const createRecipe = (meal) => {
  document.getElementById('recipeName').innerHTML = `${meal.strMeal}`;

  foodImage.setAttribute("src", `${meal.strMealThumb}`);
  foodImage.setAttribute("alt", "Image of the food");


  while (videoContainer.hasChildNodes()) {
    videoContainer.removeChild(videoContainer.lastChild);
  }
  var ifrm = document.createElement('iframe');
  ifrm.setAttribute("src", `https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}`);
	ifrm.allowFullscreen = true;
  videoContainer.appendChild(ifrm)

	document.getElementById('directions').innerHTML = `${meal.strInstructions}`;

  ul = document.getElementById('ingredients');
	while (ul.hasChildNodes()) {
		ul.removeChild(ul.lastChild);
	}
  // Get all ingredients from the object. Up to 30
  for(let i=1; i<=30; i++) {
    if(meal[`strIngredient${i}`]) {
      li = document.createElement('li');
      var node = document.createTextNode(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
      li.appendChild(node);
      ul.appendChild(li);
    } else {
      // Stop if no more ingredients
      break;
    }
  }

  document.getElementById('recipeArea').innerHTML = `${meal.strArea}`;
  document.getElementById('recipeCategory').innerHTML = `${meal.strCategory}`;
}

function loadRecipe() {
	const urlParams = new URLSearchParams(window.location.search);
	recipeID = urlParams.get('id');
	if(recipeID){
		var els = document.querySelectorAll("h2, h3");
		for (var i=0; i < els.length; i++) {
				els[i].setAttribute('style','visibility:visible');
		}
		fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i='+recipeID)
			.then(res => res.json())
			.then(res => {
			createRecipe(res.meals[0]);
		});
	}
};
