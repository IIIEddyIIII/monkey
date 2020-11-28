
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

function preload(){
  
  
  monkey_running =            loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
   createCanvas(600, 600);
   monkey=createSprite(80,315,20,20);
   monkey.addAnimation("moving", monkey_running);
   monkey.scale=0.15
  var survivalTime=0;
  ground = createSprite(400,350,1100,10);
  ground.velocityX=-5;
  ground.x=ground.width/2;
  console.log(ground.x)
  FoodGroup = new Group();
  obstaclesGroup = new Group();
  score = 0;  
}


function draw() {
  background(255) 
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
    if(keyDown("space") ) {
      monkey.velocityY = -10;
    }
    monkey.velocityY = monkey.velocityY + 0.9;
    monkey.collide(ground);   
    spawnFood();
    spawnObstacles();
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 490,50);        
    if(obstaclesGroup.isTouching(monkey)){
        ground.velocityX = 0;
        monkey.velocityY = 0;
        obstaclesGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        obstaclesGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);      
    }  
  fill("black");
  survivalTime=Math.round(frameCount/frameRate()) 
  text("survival time: "+ survivalTime, 200,50);
}
function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,319,10,40);
    obstacle.velocityX = -8;
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;     
    obstacle.lifetime = 270;
    obstaclesGroup.add(obstacle);
  }
}

function spawnFood() {
  if (frameCount % 80 === 0) {
    banana = createSprite(590,240,40,10);
    banana.y = random(100,200);    
    banana.velocityX = -5;
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
     banana.addImage(bananaImage);
     banana.scale=0.05;
    FoodGroup.add(banana);
  }
}