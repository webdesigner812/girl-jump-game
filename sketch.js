var PLAY = 1;
var END = 2;
var WAIT = 0
var gameState = WAIT;

var girl,girlrun,girlcollide,girlImg;
var ground, groundImg, invisibleGround;
var bgImg;

var obstaclesgroup, obstacle1, obstacle2;
var coingroup, coinImage;

var coinsnd,jumpsnd,startsnd,hitsnd;

var life,lifepng;
var start,startimg;
var restart,restartimg;

var gameOver,restart;

var score=0;
var coins=0;
var life=185;

function preload(){
  bgImg = loadImage("assets/bg.png");

  startimg= loadImage("assets/startbtn.png");
  restartimg=loadImage("assets/reset.png");

  groundImg= loadImage("assets/groundbg.png")

  girlrun= loadAnimation("assets/g1.png","assets/g2.png","assets/g3.png","assets/g4.png","assets/g5.png","assets/g6.png");
  girlcollide= loadAnimation("assets/girlcollide.png");

  coinsnd=loadSound("assets/coinsnd.wav");
  startsnd=loadSound("assets/startsnd.wav");
  jumpsnd=loadSound("assets/jumpsnd.wav");
  hitsnd = loadSound("assets/hit.wav");

  obstacle1 = loadImage("assets/cone.png");
  obstacle2 = loadImage("assets/barricade.png");
  coinImgage = loadImage("assets/goldCoin.png");



}

function setup() {
  createCanvas(1200,700);
  
  girl = createSprite(100, 640, 20, 50);
  girl.addAnimation("running",girlrun);
  girl.scale=0.6;
  girl.visible=false;
  girl.setCollider('circle',0,0,350)
  //girl.debug=true
  
  

  ground = createSprite(200,540,1200,20);
  ground.addImage("ground",groundImg);
  ground.x =ground.width/2
 

  invisibleGround = createSprite(200,540,1200,10);  
  invisibleGround.visible =false
  

  obstaclesgroup =  createGroup();
  coingroup = createGroup();

  start =  createSprite(650, 300,25,25);
  start.addImage("start",startimg);
  start.scale = 0.5;
  
  /*restart = createSprite(width/2,height/2);
  restart.addImage(restartImg);*/

  score=0;
  life=185;
  coins=0;

}

function draw() {
  background(bgImg);  
  
  //adding score label
  textSize(20);
  fill("black")
  text("Score: "+ score,30,50);

  //adding coin label
  textSize(20);
  fill("black")
  text("Coins:" + coins,30,90);
  
  if (mousePressedOver(start)) {

    gameState = PLAY;
    start.visible=false;
    startsnd.play( );
    girl.visible=true;


  }
  
  if (gameState===PLAY) {

    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(4 + 3*score/100);

    if(keyDown("space") && girl.y >=600) {
      jumpsnd.play( )
      girl.velocityY = -10;
       
    }
    
    girl.velocityY = girl.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
   
    spawnCoins();
    spawnObstacles();

    lifebar();

    if (obstaclesgroup.isTouching(girl)) {

     colliding()

    }

    if (coingroup.isTouching(girl)) {

      collecting();

    }

    if (gameState === END ) {
      //gameOver function call here!!
console.log("gameover");
    }


  }
  girl.collide(invisibleGround);
  drawSprites();
}

function lifebar(){
  fill("white")
  rect(girl.positionX,height/2-100,80,20);
  fill("red")
  rect(girl.positionX,height/2-100,life,20);

}

function spawnObstacles(){

if(frameCount % 60 === 0) {
  var obstacle = createSprite(600,height-95,20,30);
  obstacle.setCollider('circle',0,0,45)
  // obstacle.debug = true

  obstacle.velocityX = -(6 + score/100);
  
  //generate random obstacles
  var rand = Math.round(random(1,2));
  switch(rand) {
    case 1: obstacle.addImage(obstacle1);
            break;
    case 2: obstacle.addImage(obstacle2);
            break;
    default: break;
  }
  
  //assign scale and lifetime to the obstacle           
  obstacle.scale = 0.3;
  obstacle.lifetime = 300;
  obstacle.depth = girl.depth;
  girl.depth +=1;
  //add each obstacle to the group
  obstaclesgroup.add(obstacle);
}
}
function spawnCoins(){

  if(frameCount % 80 === 0) {
    var coin = createSprite(600,height-95,20,30);
    coin.setCollider('circle',0,0,45)
    // obstacle.debug = true
  
    coin.velocityX = -3;
    
    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: coin.addImage(obstacle1);
              break;
      case 2: coin.addImage(obstacle2);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    coin.scale = 0.3;
    coin.lifetime = 300;
    coin.depth = girl.depth;
    girl.depth +=1;
    //add each obstacle to the group
    coingroup.add(coin);
  }
  }

  function collecting() {
    coins = coins+1 ;
    coinsnd.play();

  }

  function colliding(){
    life =life-185/4
    hitsnd.play();
    if(life <=0) {
      gameState = END
    }


  }

