var mainState = {

  //place all the objects in the world
  create: function(){
    // var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'phaser');
    // logo.anchor.setTo(0.5, 0.5);

    game.add.tileSprite(0, 0, 1920, 1920, 'background');
    game.world.setBounds(0, 0, 1920, 1920);

    game.physics.startSystem(Phaser.Physics.ARCADE);

    //logic to get correct player position if coming from imageState
    if(startingGame){
      player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
      startingGame = false;
    }
    else{
      //if persisting data put it in here
      player = game.add.sprite(playerX, playerY, 'player');
    }

    npc = game.add.sprite(game.world.centerX/2, game.world.centerY/2, 'npc');
    testSprite = game.add.sprite(game.world.centerX/2, game.world.centerY/2 + 300, 'npc');

    game.physics.enable([player,npc,testSprite], Phaser.Physics.ARCADE);
    npc.body.immovable = true;
    testSprite.body.immovable = true;
    player.fixedRotation = true;

    cursors = game.input.keyboard.createCursorKeys();

    game.camera.follow(player);

    var blurX = game.add.filter('BlurX');
    var blurY = game.add.filter('BlurY');
    var gray = game.add.filter('Gray');


    blurX.blur = 100;
    blurY.blur = 1;


    // logo.filters = [blurX, blurY, gray];
    //  Here we create a group, populate it with sprites, give them all a random velocity
    //  and then check the group against itself for collision



    testImage = new MonsterMystery.GameImage(game, 'phaser', game.world.centerX/2 + 300, game.world.centerY/2, gray);
    testImage2 = new MonsterMystery.GameImage(game, 'npc', game.world.centerX/4 + 300, game.world.centerY/4, gray);
    testImage.toggle();
    testImage2.toggle();

    game.physics.enable([testImage2], Phaser.Physics.ARCADE);
    // testImage.toggle();
    // console.log(testImage);
    // testImage.toggle();

    onProblem = false;


    var style = { font: "32px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: 200, align: "center", backgroundColor: "#ffff00" };


    spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);



    //--- START/RESTART

    restart_label = game.add.text(w - 100, 20, 'Restart', { font: '24px Arial', fill: '#fff' });
    restart_label.inputEnabled = true;

    restart_label.events.onInputUp.add(function () {
       // When the paus button is pressed, we pause the game
       //game.paused = true;

       console.log('meow');

       startingGame = true;
       this.game.state.start("Main");

       // Then add the menu
      // menu = game.add.sprite(w/2, h/2, 'menu');
      // menu.anchor.setTo(0.5, 0.5);


    });


   restart_label.fixedToCamera = true;

    },


    update: function(){

    //player.body.setZeroVelocity();
      player.body.velocity.setTo(0, 0);
      player.body.angularVelocity = 0;

      game.physics.arcade.collide(player, npc, collisionHandler, null, this);
      game.physics.arcade.collide(player, testSprite, displayImages, null, this);
      game.physics.arcade.collide(player, testImage2, this.stateChangeCollision, null, this);


      if (cursors.up.isDown)
      {
        //player.body.moveUp(300)
        player.body.velocity.y = -300;
      }
      else if (cursors.down.isDown)
      {
        //player.body.moveDown(300);
        player.body.velocity.y = 300;
      }
        //Touch Based Movement
        //ActivePointer should be mouse OR finger, depending on device

      if(createTextFlag == false){// if text box not up, move
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
    }


    if (spacebar.isDown)
      {
        removeText();
        //test code for win state
        //TODO remove next line
        this.win();
      }

  },


  render: function(){

    game.debug.cameraInfo(game.camera, 32, 32);
    game.debug.spriteCoords(player, 32, 500);
  },

  win: function(){
    game.state.start('GameOver');
  },

  stateChangeCollision: function(obj1, obj2){
    playerX = obj1.body.center.x;
    playerY = obj2.body.center.y;
    game.state.start('Image');
  }

}
