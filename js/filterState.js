var imageState = {

  create: function(){

    var puzzle = new filterClass(game, 'turtlePic1', [[blurShader, "BLUR"], [blurShader,"COOLBLUR"], [blurShader, "TUMBLUR"]]);
    puzzle.setup();

  },

  toGame: function(){
    game.state.start('GameOver');
    console.log('hello');
  }

}
