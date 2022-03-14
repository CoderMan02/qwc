const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var PLAY = 1;
var END = 0;
var gamestate = PLAY; 
var score;

var ground, station;
var backgroundImage, stationImage;
var UFO;
var UFOS = [];


function preload(){
  backgroundImage = loadImage("assets/background.jpg");
  stationImage = loadImage("assets/tower.png");
  UFOImage = loadImage("assets/ufo.png");
  UFO2Image = loadImage("assets/ufo_02.png")
  rocket = loadImage("assets/rocket1.png")
}


function setup(){
    createCanvas(windowWidth, windowHeight)
    engine = Engine.create()
    world = engine.world;

    angleMode(DEGREES);

    ground = Bodies.rectangle(0, height - 1, width*2, 1, {isStatic: true});
    World.add(world, ground);

    station = Bodies.rectangle(160,350,1160,310, {isStatic: true});
    World.add(world, station);

    edges = createEdgeSprites();
    rocket.collide(rightEdge);
  }
  
  function draw(){
    background(189);
    image(backgroundImage, 0, 0 , displayWidth,displayHeight);

    Engine.update(engine);    

    push();
    fill("black");
    rectMode(CENTER);
    rect(ground.position.x, ground.position.y, width*2, 1);
    pop();
    
    push()
    imageMode(CENTER);
    image(stationImage, station.position.x, 575, 300, 430);
    pop()

    rocket.y = World.mouseY

    spawnObstacles();
    drawSprites();
  }
 

  function spawnObstacles() {

    if(frameCount % 100 === 0) {

      var obstacle = createSprite(1200,  165, 10, 40);
      obstacle.y = Math.round(random(20, 400))
      obstacle.lifetime = 400;

    

    var rand = Math.round(random(1, 2));

    switch(rand) {
      case 1: 
      obstacle.addImage("ufo", UFOImage); break;
      
      case 2: 
      obstacle.addImage("ufo1", UFO2Image); break;

      default: break;
    }

    obstacle.scale = 0.5;
    obstacle.velocityX = -8 
    obstacle.depth = obstacle.depth + 1;
  }
}