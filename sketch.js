//Create variables here
var dog,happyDog;
var dogIMG,dogImg2;
var database;
var FoodS,Foodstock;
var feed;
var foodObj;
var fedTime,lastFed;
function preload()
{
  //load images here
  dogIMG=loadImage("images/dogImg.png");
dogImg2=loadImage("images/dogImg1.png")
  
}

function setup() {

  createCanvas(1000, 900);
  dog=createSprite(400,400,10,10);
  dog.addImage(dogIMG);
  dog.scale=0.2;  
 database=firebase.database();
  Foodstock=database.ref('food');
  Foodstock.on("value",readStock);
  feed=createButton("Feed The Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);
foodobj=new Food();
  
  addFood=createButton("Add Food");
  addFood.position(830,95);
  addFood.mousePressed(addFoods);
}


function draw() { 
  foodobj.display();
  background(46,139,87); 
  if(keyWentDown(UP_ARROW)){
    writeStock(FoodS);
    dog.addImage(dogImg2);
  }
dog.display();
fill(255,255,254);
textSize(15);
if(lastFed>=12){
  text("Last Feed:"+lastFed%12+ "PM",350,30);
}else if(lastFed==0){
  text("Last Feed: 12 AM",350,30)
}else {
  text("Last Feed :"+lastFed+"AM",350,30);
}

  drawSprites();
  //add styles here
  fill("red");
  textSize(20);
  stroke(5);
  text("Note: Press UP_ARROW Kew To Feed Drago milk !",100,100);
  text("Food remaining: "+ FoodS,200,200);
}
function readStock(data){
  FoodS=data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
}else{
   x=x-1;
  }
  database.ref('/').update({
    food:x
  });
 

  
}
function feedDog(){
  dog.addImage(happyDog);
  foodobj.updateFoodstock(foodobj.getFoodstock()-1);
  database.ref('/').update({
    food:foodobj.getFoodstock(),
    FeedTime:hour()
  })
  }
  function addFoods(){
    foodS++;
    database.ref('/').update({
      food:FoodS
    })
  }





