const randomRecipeBtn = document.getElementById('randomRecipeBtn');
imageContainer = document.getElementById('imageContainer');
videoContainer = document.getElementById('videoContainer');
foodImage = document.getElementById('foodImage');
ingredientContainer = document.getElementById('ingredientContainer');
directionContainer = document.getElementById('directionContainer');

randomRecipeBtn.addEventListener('click', () => {
	fetch('https://www.themealdb.com/api/json/v1/1/random.php')
		.then(res => res.json())
		.then(res => {
		createMeal(res.meals[0]);
	});
});

const createMeal = (meal) => {

  document.getElementById('recipeName').innerHTML = `${meal.strMeal}`;

  foodImage.setAttribute("src", `${meal.strMealThumb}`);
  foodImage.setAttribute("alt", "Image of the food");

  var ifrm = document.createElement('iframe');
  ifrm.setAttribute("src", `https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}`);
  ifrm.setAttribute('width', '420');
  ifrm.setAttribute('height', '315');
  videoContainer.appendChild(ifrm)

  var instruction = document.createElement('p');
  var node = document.createTextNode(`${meal.strInstructions}`);
  instruction.appendChild(node);
  directionContainer.appendChild(node);

  ul = document.createElement('ul');
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
  ingredientContainer.appendChild(ul);

  document.getElementById('recipeArea').innerHTML = "Area: "+ `${meal.strArea}`;
  document.getElementById('recipeCategory').innerHTML = "Category: "+ `${meal.strCategory}`;
}
