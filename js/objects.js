

Turtle = function(x, y, game, sprite, message){
  this.message = message;
  Phaser.Sprite.call(this, game, x, y, sprite);
  //this.x = x;
  //this.y = y;

  //this.message = message;

  this.enableBody = true;
  //this.body.moves = false;
  game.add.existing(this);

  this.hitTurtle = function(){
    this.destroy();
  }
  this.removeTurtle = function(){//delete later
    this.destroy();
  }

}

Turtle.prototype = Object.create(Phaser.Sprite.prototype);
Turtle.prototype.constructor = Turtle;


//displays an NPC's dialogue
var sayDialogue = function(person){
  console.log("dialogue: " + person.dialogue);
  //later, add an overlay that displays text box and sprite for this person
}

//Collision handler for NPCs
var npcCollision = function(player, npc){
  sayDialogue(npc);
}


//a subclass(?) of sprite that displays a dialogue when collided with
NPC = function(x, y, game, sprite, dialogue){
    this.dialogue = dialogue;
    Phaser.Sprite.call(this, game, x, y, sprite);
    
    this.enableBody = true;
    game.add.existing(this);
    
    game.physics.enable([this], Phaser.Physics.ARCADE);
    this.body.immovable = true;
  
}

NPC.prototype = Object.create(Phaser.Sprite.prototype);
NPC.prototype.constructor = NPC;



//not used NOT USING THIS RIGHT NOW OK
Wall = function(x, y, height, width){
//this.sprite = game.add.sprite(200, 240, 'wall');
Phaser.Sprite.call(this, 200, 240, 'wall');
//game.physics.enable([this], Phaser.Physics.ARCADE);
//this.body.immovable = true;

}

Wall.prototype = Object.create(Phaser.Sprite.prototype);
Wall.prototype.constructor = Wall;

Wall.prototype.update = function() {
    //console.log('woupd');
};
