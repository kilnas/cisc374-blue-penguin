//--- START/RESTART

restart_label = game.add.text(w - 100, 20, 'Restart', { font: '24px Arial', fill: '#fff' });
restart_label.inputEnabled = true;

restart_label.events.onInputUp.add(function () {
   // When the paus button is pressed, we pause the game
   //game.paused = true;
   startingGame = true;
   this.game.state.start("Main");

   // Then add the menu
  // menu = game.add.sprite(w/2, h/2, 'menu');
  // menu.anchor.setTo(0.5, 0.5);


});


restart_label.fixedToCamera = true;

//MUTE BUTTON LABEL
mute_label = game.add.text(w - 100, 40, 'Mute', { font: '20px Arial', fill: '#fff' });
 mute_label.inputEnabled = true;
 mute_label.fixedToCamera = true;

mute_label.events.onInputUp.add(function () {

    if(music.mute == false){
      music.mute = true;
    }else{
      music.mute = false;
    }
     //game.input.onDown.add(changeVolume, this);
});
