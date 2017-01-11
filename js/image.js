MonsterMystery.GameImage = function(game, asset, x, y, filter){

  //make image a new Sprite
<<<<<<< HEAD
  Phaser.Sprite.call(this, game, x, y, asset, 0);
=======
  Phaser.Sprite.call(this, game, x, y, asset);
>>>>>>> 0cd0190dcaaffbd818bf5b38d59c18710d388249

  this.filtered = false;
  this.filter = filter;

  this.inputEnabled = true;
  this.events.onInputDown.add(this.toggle);

  game.add.existing(this);

  return this;

}

MonsterMystery.GameImage.prototype = Object.create(Phaser.Sprite.prototype);
MonsterMystery.GameImage.prototype.constructor = MonsterMystery.GameImage;

MonsterMystery.GameImage.prototype.update = function() {
  if (this.filtered) {
    this.filters = [ ];
  }
  else {
    this.filters = [ this.filter ];
  }
}

//This is the function to toggle the filter that is on the image
MonsterMystery.GameImage.prototype.toggle = function(){

  if(this.filtered){
    console.log("none");
    this.filtered = false;
<<<<<<< HEAD
    this.mySprite.filters = [];
=======
    // this.filters = [ ];
>>>>>>> 0cd0190dcaaffbd818bf5b38d59c18710d388249
  }
  else{
    console.log("gray");
    this.filtered = true;
    // this.filters = [ this.filter ];
  }

}
