// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)

var score = -2;
var labelScore;
var player;
var pipes = [];
var gapSize = 100;
var gapMargin = 50;
var height = 400;
var width = 790;
var blockHeight = 50;
var pipeEndExtraWidth = 5;
var pipeEndHeight = 25;
var balloons =[];
var weights = [];
var gameSpeed = 75;

var game = new Phaser.Game(width, height, Phaser.AUTO, 'game', stateActions);
/*
 * Loads all resources for the game and gives them names.
 */
function preload() {

  game.load.image("playerImg","../assets/flappy_frog.png");
  game.load.audio("sound","../assets/sound.ogg");
  game.load.image("pipeBlock","../assets/pipe2-body.png");
  game.load.image("background1","../assets/lake1.png");
  game.load.image("pipeEnd","../assets/pipe2-end.png");
  game.load.image("balloons","../assets/balloons.png");
  game.load.image("weight","../assets/weight.png");
  game.load.audio("death","../assets/Pain.ogg");
}

/*
 * Initialises the game. This function is only called once.
 */
function create() {

  background1 = game.add.sprite(0,0,"background1");
  background1.height = 400;
  background1.width = 790;

  game.physics.startSystem(Phaser.Physics.ARCADE);

    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    .onDown.add(playerJump);

    var backgroundVelocity = gameSpeed / 1;
    var backgroundSprite = game.add.tileSprite(0,0, width, height,"background1");
    backgroundSprite.autoScroll(-backgroundVelocity, 0);

    labelScore = game.add.text(0, 0, "0");

    player = game.add.sprite(50,100, "playerImg");

    player.anchor.setTo(0.5, 0.5);

    game.physics.arcade.enable(player);

    player.body.gravity.y = 500;


      var pipeInterval = 2 * Phaser.Timer.SECOND;
      game.time.events.loop(
        pipeInterval,
        generate,
      );
    var pipeInterval2 = 0.25 * Phaser.Timer.SECOND;
    game.time.events.loop(
      pipeInterval,
      moveForward
    );

}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {

    game.physics.arcade.overlap(
    player,
    pipes,
    gameOver);


    if(player.body.y < 0 || player.body.y > 400) {
      gameOver();
    }

    player.rotation += 1;
    player.rotation = Math.atan(player.body.velocity.y / 200);

  game.physics.arcade.overlap(player, balloons, gameOver);
  if(player.body.y<0) {
    gameOver();
  }

  game.physics.arcade.overlap(player, weights, gameOver);
  if(player.body.y<0) {
    gameOver();
  }

}

function changeScore() {

  score = score + 1;
  labelScore.setText(score.toString());

}

function addPipeBlock(x,y) {

  var block = game.add.sprite(x, y, "pipeBlock");
  pipes.push(block);

  game.physics.arcade.enable(block);
  block.body.velocity.x = -200;

}

function addPipeEnd(x,y) {
    var pipeEnd = game.add.sprite(x,y, "pipeEnd");
    pipes.push(pipeEnd);
    game.physics.arcade.enable(pipeEnd);
    pipeEnd.body.velocity.x = -200;
}

function generatePipe() {

  var gapStart = game.rnd.integerInRange(gapMargin, height - gapSize - gapMargin);

  addPipeEnd(width - (pipeEndExtraWidth/2),gapStart);

  for(var y = gapStart; y > 0; y -= blockHeight) {
 addPipeBlock(width, y - blockHeight);
 }


  for(var y = gapStart + gapSize; y < height; y += blockHeight) {
 addPipeBlock(width, y);
 }
 addPipeEnd(width - (pipeEndExtraWidth/2),gapStart+gapSize);

  changeScore();

}

function generateBalloons() {

  var bonus = game.add.sprite(width,height,"balloons");
  balloons.push(bonus);
  game.physics.arcade.enable(bonus);
  bonus.body.velocity.x = - 200;
  bonus.body.velocity.y = - game.rnd.integerInRange(60,100);

}

function generateWeight() {

  var bonus = game.add.sprite(width,height,"weight");
  weights.push(bonus);
  game.physics.arcade.enable(bonus);
  bonus.body.velocity.x = -200;
  bonus.body.velocity.y = - game.rnd.integerInRange(60,100);

}

function moveForward() {
  player.x = player.x + 1;
}

function generate() {
  var diceRoll = game.rnd.integerInRange(1, 10);
  if(diceRoll==1) {
     generateBalloons();
   }
   else if(diceRoll==2) {
     generateWeight();
   } else {
     generatePipe();
 }
}

function playerJump() {

  player.body.velocity.y=-275;
  game.sound.play("sound");
}

function gameOver() {
  game.sound.play("death");
  registerScore(score);
  score = -2;
  game.state.restart();

}
