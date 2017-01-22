var bootState = {

  //on boot we load the fonts for the game
  create: function(){
    WebFontConfig = { // load custom google fonts
      google: {
        families: ['Coming Soon']
      }
    };

    game.state.start('Preload');
  }

}
