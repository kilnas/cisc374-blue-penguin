MonsterMystery.GameImage = function(game, asset, x, y, filter){

  //make image a new Sprite
  Phaser.Sprite.call(this, game, x, y, asset, 0);

  this.filtered = false;
  this.filter = filter;

  this.mySprite = game.add.sprite(x, y, asset);

  return this;

}

MonsterMystery.GameImage.prototype = Object.create(Phaser.Sprite.prototype);
MonsterMystery.GameImage.prototype.constructor = MonsterMystery.GameImage;

//This is the function to toggle the filter that is on the image
MonsterMystery.GameImage.prototype.toggle = function(){

  if(this.filtered){
    this.filtered = false;
    this.mySprite.filters = [ ];
  }
  else{
    this.filtered = true;
    this.mySprite.filters = [ this.filter ];
  }

}
