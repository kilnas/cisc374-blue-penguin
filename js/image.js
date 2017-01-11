MonsterMystery.GameImage = function(game, asset, x, y, filter){

  //make image a new Sprite

  Phaser.Sprite.call(this, game, x, y, asset, 0);

  this.filtered = false;
  this.filter = filter;

  this.inputEnabled = true;
  this.events.onInputDown.add(this.toggle);

  game.add.existing(this);

  return this;

}

MonsterMystery.GameImage.prototype = Object.create(Phaser.Sprite.prototype);
MonsterMystery.GameImage.prototype.constructor = MonsterMystery.GameImage;



//This is the function to toggle the filter that is on the image
MonsterMystery.GameImage.prototype.toggle = function(){

  if(this.filtered){
    console.log("none");
    this.filtered = false;
    this.filters = null;

  }
  else{
    console.log("gray");
    this.filtered = true;
    this.filters = [ this.filter ]
  }

}
