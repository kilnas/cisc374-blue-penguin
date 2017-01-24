TurtleAdventure.GameImage = function(game, asset, x, y, filter){

  //make image a new Sprite

  Phaser.Sprite.call(this, game, x, y, asset, 0);

  this.filtered = false;
  this.filter = filter;

  this.inputEnabled = true;
  this.events.onInputDown.add(this.toggle, this);
  this.toggle();
  this.toggle();

  game.add.existing(this);

  return this;

}

TurtleAdventure.GameImage.prototype = Object.create(Phaser.Sprite.prototype);
TurtleAdventure.GameImage.prototype.constructor = TurtleAdventure.GameImage;


TurtleAdventure.GameImage.prototype.update = function() {

}

//This is the function to toggle the filter that is on the image
TurtleAdventure.GameImage.prototype.toggle = function(){

  if(this.filtered){
    this.filtered = false;
    this.filters = null;

  }
  else{
    this.filtered = true;
    this.filters = [ this.filter ];
  }

}
