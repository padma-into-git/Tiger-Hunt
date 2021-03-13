var PLAY = 1;
var END = 0;
var gameState = PLAY;

var tiger, tigerRunning, tigerCollided;
var forest, forestImage, invisibleGround;
var meatGroup, meatImage;

var hunter, hunterImage;
var bulletGroup, bulletImage;

var score=0;
var restartImg, gameOverImg;

function preload(){
  tigerRunning = loadAnimation("tiger1.png","tiger2.png");
  tigerCollided = loadImage("tigerfall.png");
  meatImage = loadImage("meat.png");
  
  hunterImage = loadImage("hunter.png");
  bulletImage = loadImage("obstacle.png");
  
  forestImage = loadImage("forest.jpg");

  restartImg = loadImage("restart.png");
  gameOverImg = loadImage("gameover.png");
  
}

function setup() {
  createCanvas(600, 350);
  
  tiger = createSprite(370,300,20,50);
  tiger.addAnimation("running", tigerRunning);
  tiger.scale = 0.5;
  
  forest = createSprite(-100,200,20,20);
  forest.addImage(forestImage);
  
  hunter = createSprite(100, 270, 20, 20);
  hunter.addImage("hunter", hunterImage);
  hunter.scale=0.410;
  
  score = 0;
  
  invisibleGround = createSprite(370,350,300,10);
  invisibleGround.visible=false;
  
  meatGroup = new Group();
  bulletGroup = new Group();
  
  tiger.setCollider("rectangle",0,0,250,150);
  tiger.debug = false
  
  gameOver = createSprite(300,150);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,250);
  restart.addImage(restartImg);
  
 
  gameOver.scale = 0.5;
  restart.scale = 0.3;
}

function draw() {
  
  if(gameState===PLAY){
     gameOver.visible=false;
     restart.visible=false;
       forest.velocityX = -(3 + 3*score/2)
  if (forest.x < 280){
      forest.x = forest.width/2;
    }

     forest.depth = forest.depth;
    tiger.depth = tiger.depth + 1;
  
      if(keyDown("space") && tiger.y >= 250) {
      tiger.velocityY = -12;
    }
    
   if(tiger.isTouching(meatGroup)){
      score=score+1
      meatGroup[0].destroy();
      }
    
   tiger.velocityY = tiger.velocityY + 0.8
    if(bulletGroup.isTouching(tiger)){
       gameState=END
       }
     }
    else if(gameState===END){
        gameOver.visible=true;
        restart.visible=true;
    tiger.addAnimation("collided", tigerCollided);
    forest.velocityX=0;
    tiger.velocityY = 0;
    bulletGroup.setVelocityXEach(0);
    meatGroup.setVelocityXEach(0);
    meatGroup.destroyEach();
    bulletGroup.destroyEach();
    tiger.changeAnimation("collided",tigerCollided);
    tiger.scale =0.5;
      
      if(mousePressedOver(restart)){
      gameState=PLAY
        reset();
    }
    }
  
  tiger.collide(invisibleGround);
  

  
  
  spawnMeat();
  spawnBullet();
  drawSprites();
  
  textSize(20);
  fill("black");
  text("Score: "+ score, 500,60);
  }

function spawnBullet(){
    if (frameCount % 150 === 0) {
    var bullet = createSprite(165,270,40,10);
    bullet.y = Math.round(random(270,270));
    bullet.addImage(bulletImage);
    bullet.scale = 0.07;
    bullet.velocityX = (5 + 3*score/2);
    
     //assign lifetime to the variable
    bullet.lifetime = 200;
    
    bullet.depth = hunter.depth;
    hunter.depth = hunter.depth + 1;
    
    //add each cloud to the group
    bulletGroup.add(bullet);
  }
}

function spawnMeat(){
  
    if (frameCount % 60 === 0) {
    var meat = createSprite(600,120,40,10);
    meat.y = Math.round(random(130,180));
    meat.addImage(meatImage);
    meat.scale = 0.2;
    meat.velocityX = -(3 + 3*score/2);
    
     //assign lifetime to the variable
    meat.lifetime = 200;
    
    //adjust the depth
    meat.depth = tiger.depth;
    tiger.depth = tiger.depth + 1;
    
    //add each cloud to the group
    meatGroup.add(meat);
    }
}

function reset(){
  gameState=PLAY
  tiger.addAnimation("running", tigerRunning);
  score=0;
  tiger.changeAnimation("running",tigerRunning);
  bulletGroup.destroyEach();
  meatGroup.destroyEach();
}
