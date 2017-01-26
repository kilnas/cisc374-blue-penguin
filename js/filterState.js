var imageState = {

  create: function(){
    //format for shader list: [[shader, textName, passes]
    //note: passes removed for now bc not working
    /*var puzzle = new filterClass(game, 'turtlePic1', [[blurShader, "BLUR",0], [blurShader,"COOLBLUR",1], [blurShader, "TUMBLUR",2]]);*/
    //var puzzle = new filterClass(game, 'turtlePic1', [[blurShader, "BLUR", 1]])
    puzzle.setup();

  },

  toGame: function(){
    game.state.start('GameOver');
    console.log('hello');
  }

}
