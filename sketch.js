var dog,sadDog,happyDog,foodObj,foodS,database,addFoodButton,feedFoodButton;
var lastFed,fedTime; 


function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  createCanvas(1000,400);
  
  database = firebase.database();

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  foodObj = new FOOD();

  
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

feedFoodButton = createButton("Feed The Dog");
feedFoodButton.position(700,95);
feedFoodButton.mousePressed(feedDog);

addFoodButton = createButton("Add Food");
addFoodButton.position(800,95);
addFoodButton.mousePressed(addFoods);

}

function draw() {
  background(0,250,0);
  foodObj.display();

  drawSprites();

fedTime = database.ref('FeedTime');
fedTime.on("value",function(data){
  lastFed = data.val();
})

fill(255,255,254);
textSize(15);
if(lastFed>=12)
{
text("last Feed : " + lastFed%12 + " PM" ,350,30);
}else if( lastFed === 0)
  {
    text("last Feed : 12 Am ",350,30);
  }else
  {
    text("last Feed : " + lastFed + " AM" ,350,30);
  }

}

//function to read food Stock
function readStock(data)
{

foodS = data.val();
foodObj.updateFoodStock(foodS);

}


//function to update food stock and last fed time
function feedDog()
{

dog.addImage(happyDog);

foodObj.updateFoodStock(foodObj.getFoodStock()-1);
database.ref('/').update({
  Food : foodObj.getFoodStock(),
  FeedTime : hour()
})

}


//function to add food in stock
function addFoods()
{

foodS ++ ;
database.ref('/').update({Food : foodS});

}

