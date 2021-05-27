var bg, bgImage;
var score = 0, lifecount = 3;
var life, lifeImage;
var gameState = "play";
var robot,robotImage, robotRunning;
var zomby, zombyImage,zombiesGroup;
var x =0;
var heart1, heart2, heart3;
var gameOver, gameOverImg, restart, restartImg;
var bulletImage, bullet, bulletGroup;
var kill = 0;

function preload(){

    bgImage = loadImage("images/background.jpg")
    lifeImage = loadImage("images/life.png");
    gameOverImg = loadImage("images/gameover.png");
    restartImg = loadImage("images/restart.png");
//    robotImage = loadImage("images/player.png");
    robotRunning = loadAnimation("images/player1.png", "images/player2.png");
    robotShooting = loadImage("images/player3.png");
    bulletImage = loadImage("images/bullet.png");
    
}

function setup(){
    createCanvas(displayWidth, displayHeight-100);
  
    bg = createSprite(displayWidth/2, displayHeight/2-280, displayWidth, displayHeight);
    bg.addImage(bgImage);
    bg.scale = 2.8;

    //creating robot sprite
    robot = createSprite(230, 800, 40, 160);
    robot.addAnimation("running",robotRunning);
    robot.scale = 3.5;
    
    //creating life sprites
    heart1 = createSprite(70, 110);
    heart1.addImage(lifeImage); 
    heart1.scale = 0.3;
    heart2 = createSprite(140, 110);
    heart2.addImage(lifeImage); 
    heart2.scale = 0.3;
    heart3 = createSprite(210, 110);
    heart3.addImage(lifeImage); 
    heart3.scale = 0.3;

    //creating game over sprite
    gameOver = createSprite(displayWidth/2, displayHeight/2-180,10,10); 
    gameOver.addImage("GameOver",gameOverImg);
    gameOver.scale=0.8;

    //creating restart sprite
    restart = createSprite(displayWidth/2, displayHeight/2+80,10,10);
    restart.addImage("restartButton",restartImg);
    restart.scale=0.3;
    

    zombiesGroup = new Group();
    bulletGroup = new Group();
}
function draw(){
    background(0);
    if(gameState == "play"){

        gameOver.visible=false;
        restart.visible=false;

        if(bg.x<displayWidth/2-400){
            bg.x = displayWidth/2;
        }

        bg.velocityX = -3;

        if(keyDown(UP_ARROW) && robot.y>720){
            robot.y=robot.y-3;
        }
        if(keyDown(DOWN_ARROW) && robot.y<880){
            robot.y=robot.y+3;
        }
       
        
        if(robot.isTouching(zombiesGroup)){
            lifecount = lifecount-1;
            zombiesGroup.destroyEach();
        }
        
        if(lifecount === 2){

            heart3.visible = false;

        }else if(lifecount === 1){
           
            heart2.visible = false;
            heart3.visible = false;

        }else  if(lifecount === 0){
           
            gameState = "end";
            heart1.visible = false;
            heart2.visible = false;
            heart3.visible = false;

        }

   //spawn the zombies      
    spawnZombies();

    //run  robot on pressing right arrow

    if(keyWentDown('f')){
        robot.addAnimation("shooting", robotShooting);
        robot.changeAnimation("shooting");

        spawnBullets();
        
        }

        if(keyWentUp('f')){

            robot.addAnimation("running");
            robot.changeAnimation("running");
            
            }
    
       //check if bullets hit zombies

       if(bulletGroup.isTouching(zombiesGroup)){
           kill = kill + 1;
           zombiesGroup.destroyEach();
           bulletGroup.destroyEach();

       }

      }

//Gamestate end condition
if(gameState == "end"){
    
    gameOver.visible=true;
    restart.visible=true;
    bg.visible = false;
    robot.visible = false;
   
}

//checking whether the restart is clicked or not
if(mousePressedOver(restart)){
 
    reset();
}

//draw the sprites
drawSprites();

//display score
textSize(50);
fill("yellow");
text("Kill: "+kill,displayWidth-200, 110);

}

//function to spawn zombies
function spawnZombies(){

    if(frameCount%50===0){
        zomby = createSprite(displayWidth+10, 800,40,160);
        zomby.debug = true;
        zomby.shapeColor = "red";
        zomby.velocityX = -18;
        zomby.y = Math.round(random(720, 880));
        zomby.lifetime = displayWidth+100;
        zombiesGroup.add(zomby);

    }

}

//funtion to spawn bullets
function spawnBullets(){

        bullet = createSprite(400, 800,40,160);
        bullet.setCollider("rectangle", -10, -5, 10,10);
        bullet.scale = 5.0;
        bullet.addImage(bulletImage);
        bullet.velocityX = 10;
        //bullet.y = Math.round(random(720, 880));
        bullet.lifetime = displayWidth+100;
        bulletGroup.add(bullet);

    
}

//function to reset the game
function reset(){

    gameState = "play";
    score = 0;
    lifecount = 3;
    bg.visible = true;
    robot.visible = true;
    heart1.visible = true;
    heart2.visible = true;
    heart3.visible = true;  
    
    
}
