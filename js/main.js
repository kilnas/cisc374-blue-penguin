var mainState = {

  //place all the objects in the world
  create: function(){

    music = game.add.audio('noir1');
    music.play();

    game.add.tileSprite(0, 0, 1920, 1920, 'background');
    game.world.setBounds(0, 0, 1920, 1920);

    game.physics.startSystem(Phaser.Physics.ARCADE);


    turtle = new Turtle(80, 60, game, 'turtle', content);

    //logic to get correct player position if coming from imageState
    if(startingGame){
      player = game.add.sprite(game.world.centerX, game.world._height - 200, 'kiwi');
      startingGame = false;
      turtle.visible = false;
      foundPerson = false;
      completedPuzzle1 = false;
    }
    else{
      //if persisting data put it in here
      player = game.add.sprite(playerX, playerY, 'kiwi');


    }
    createTextFlag = false;


      if(!foundPerson){
          turtle.visible = false;
      }
      else{
          turtle.visible = true;
      }



    introText = new Textbox(game.camera.width / 2, game.camera.height / 2, intro);
    turtleText = new Textbox(game.camera.width / 2, game.camera.height / 2, content);


    game.physics.enable([player,testSprite], Phaser.Physics.ARCADE);
    testSprite.body.immovable = true;
    player.fixedRotation = true;

    cursors = game.input.keyboard.createCursorKeys();

    game.camera.follow(player);

    game.physics.enable([turtle], Phaser.Physics.ARCADE);
    turtle.body.immovable = true;
    wallGroup = game.add.physicsGroup();




    var level2 = [
     'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
     'x              x                                      x',
     'x              x                                      x',
     'x              x                                      x',
     'x              x       x                              x',
     'x                      x                           xxxx',
     'x                      x                x          x',
     'x                      x                x          x',
     'xxxxxxxxxxxxxxxxxxxxxxxx                x          x',
     '                                        x          x',
     '                                        x          x',
     '                                        x          x',
     '                                        x          x',
     '                                        x          x',
     'x      xxxxxx          xxx    xxx       xxxxxxxxxxxx',
     'x         x            xxxx  xxxx                 x',
     'x         x             xxxxxxxx                  x',
     'x         x              xxxxxx                   x',
     'x      xxxxxx              xx                     x',
     'x                                                 x',
     'x                                                 x',
     'x                                                 x',
     'x      xxxxxx  x   x  xxxx  xxxxx  x     xxxxxxx  x',
     'x         x    x   x  x  x    x    x     x        x',
     'x         x    x   x  x x     x    x     xxxxx    x',
     'x         x     xxx   x  x    x    x     x        x',
     'x         x                        xxxxx xxxxx    x',
     'x         x                                       x',
     'x         x                                       x',
     'x         x                                       x',
     'x         x                                       x',
     'x         xxxxxxxxxxxxxx      xxxxxxxxxxxxxxxxxxxxx',
     'x         x            x      x                    ',
     'x         x            x      x                    ',
     'x         x            x      x           x        ',
     'x         xxxxxxx      x      x           x       x',
     'x         x                   x           x       x',
     'x         x                   xxxxxxxxxxxxx       x',
     'x         x                               x       x',
     'x         x                               x       x',
     'x       xxxxxxxxxxxxxxxx     xxxxxxxx     x       x',
     'x       x                    x            x       x',
     'x       x                    x            x       x',
     'x       x                    x            x       x',
     'x       x                    x            x       x',
     'x       x      xxxxxxxxx     x            x       x',
     'x                      x     x            x       x',
     'x                      x     xxxxxxxxxxxxxx       x',
     'x                      x                          x',
     'x                      x                          x',
     'x                      x                          x',
     'xxxxxxxxxxxxxxxxxxxxxxxx     xxxxxxxxxxxxxxxxxxxxxx',
 ];



 // for (var i = 0; i < level.length; i++) {
 //     for (var j = 0; j < level[i].length; j++) {
 //
 //         // Create a wall and add it to the 'walls' group
 //         if (level[i][j] == 'x') {
 //             var wall = game.add.sprite(32+32*j, 32+32*i, 'wall');
 //             wallGroup.add(wall);
 //             wall.body.immovable = true;
 //         }
 //       }
 //     }

    spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
    game.input.onTap.add(onTap, this);


    function onTap(pointer, doubleTap) {
    if (doubleTap)
    {
        //  They double-tapped, so swap the image
        if(createDiaFlag == true){
          //console.log('ppppppppppp');
          currentDialogue.removeText();
        }
    }
    else
    {

    }

  }



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

    },


    update: function(){

    //player.body.setZeroVelocity();
      player.body.velocity.setTo(0, 0);
      player.body.angularVelocity = 0;

      game.physics.arcade.collide(player, testSprite, collidePerson, null, this);
      game.physics.arcade.collide(player, testImage2, this.stateChangeCollision, null, this);

      game.physics.arcade.collide(player, turtle, this.stateChangeCollision, null, this);
      game.physics.arcade.collide(player, wallGroup, wallCollision, null, this);


      // if (cursors.up.isDown)
      // {
      //   //player.body.moveUp(300)
      //   player.body.velocity.y = -300;
      // }
      // else if (cursors.down.isDown)
      // {
      //   //player.body.moveDown(300);
      //   player.body.velocity.y = 300;
      // }
        //Touch Based Movement
        //ActivePointer should be mouse OR finger, depending on device

      if(createDiaFlag == false){// if text box not up, move //createTextFlag == false ||
        if (game.input.activePointer.isDown)
        {
            //  400 is the speed it will move towards the touch
            game.physics.arcade.moveToPointer(player, 400);

            //  if it's overlapping the touch, don't move any more
            if (Phaser.Rectangle.contains(player.body, game.input.x, game.input.y))
            {
                player.body.velocity.setTo(0, 0);
            }
        }
        else
        {
            player.body.velocity.setTo(0, 0);
        }
    }else if(createDiaFlag == true){

      if(game.input.activePointer.isDown){
          console.log('hallowe');

      }

    }


  },


  render: function(){

  },

  stateChangeCollision: function(obj1, obj2){
    if (!completedPuzzle1) {
        playerX = obj1.body.center.x;
        playerY = obj2.body.center.y;
        game.state.start('Image');
    }
  }

}
