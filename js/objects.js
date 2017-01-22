

Turtle = function(x, y, game, sprite, message){
  this.message = message;
  Phaser.Sprite.call(this, game, x, y, sprite);
  //this.x = x;
  //this.y = y;

  //this.message = message;

  this.enableBody = true;
  //this.body.moves = false;
  console.log(this.x);
  console.log(this.sprite);
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
    console.log('woupd');
};
