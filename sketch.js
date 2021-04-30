var balloon,balloonImage1,balloonImage2;
var database;
var position;
//var ballonPosition;
// create database and position variable here

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadImage("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1362,648.4);

  balloon=createSprite(250,650,150,150);
  balloon.addImage(balloonImage1);
  balloon.scale=0.5;
  ballonPosition = database.ref("balloon/position");
  ballonPosition.on("value",readPosition,showError);

  //textSize(20); 
}

// function to display UI
function draw() {
  background(bg);
  fill(0);
  //stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
  if(position!==undefined){
    if(keyDown(LEFT_ARROW)){
        writePosition(-10,0);
        balloon.addAnimation("hotAirBalloon",balloonImage2);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(10,0);
        balloon.addAnimation("hotAirBalloon",balloonImage2);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-10);
        
        balloon.scale=balloon.scale -0.01;
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+10);
       
        balloon.scale=balloon.scale +0.01;
    }
    drawSprites();
}
//balloon.addAnimation("hotAirBalloon",balloonImage2);
  
}

function readPosition(data){
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
  }
  
  function writePosition(x,y){
      database.ref("balloon/position").set({
          'x':position.x + x,
          'y':position.y + y
      })
  }
  
  function showError(){
      console.log("error");
  }

  
  