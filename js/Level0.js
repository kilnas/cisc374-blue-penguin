var Level0 = {

  create: function(){
    console.log("level 1");

    music = game.add.audio('noir1');
    music.play();

    game.add.tileSprite(0, 0, 1920, 1920, 'background');
    game.world.setBounds(0, 0, 1920, 1920);

    turtle = new Turtle(80, 60, game, 'turtle', content);
    NpcTest = new NPC(200, 100, game, 'kiwi', npctalk);

    //testSprite = game.add.sprite(game.world.centerX/2, game.world.centerY/2 + 300, 'npc');
    testSprite = new NPC(game.world.centerX/2, game.world.centerY/2 + 300,game, 'npc', sonictalk);


    if(startingGame){
      player = game.add.sprite(game.world.centerX, game.world._height - 200, 'kiwi');
    }
    else{
      //if persisting data put it in here
      player = game.add.sprite(playerX, playerY, 'kiwi');
    }


    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.enable([player, turtle], Phaser.Physics.ARCADE);
    turtle.body.immovable = true;
    player.fixedRotation = true;

    wallGroup = game.add.physicsGroup();

    game.camera.follow(player);

    game.input.onTap.add(onTap, this);

    introText = new Textbox(game.camera.width / 2, game.camera.height / 2, intro);


    if(!foundPerson){
      turtle.visible = false;
    }
    else{
      turtle.visible = true;
    }



    var level = [
      '                                                       ',
      '                                                       ',
      '                                                       ',
      '                                                       ',
      '                              ',
      '                              ',
      '',
      '',
      '',
      '',
      '',
      '',
      '  ',
      '   ',
      ' ',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '              xxxxxxxxxxxxxxxxxxxxxxxx             ',
      '              x                      x',
      '              x                      x',
      '              x                      x',
      '              x                      x',
      '              x                      x',
      '              x                      x',
      '              x                      x',
      '              x                      x',
      '              x                      x',
      '              x                      x',
      '              x                      x',
      '              x                      x',
      '              x                      x',
      '              x                      x',
      '              x                      x',
      '              x                      x',
      '              x                      x',
      '              x                      x',
      '              x                      x',
      '              xxxxxxxxxx     xxxxxxxxx             ',
    ];



    for (var i = 0; i < level.length; i++) {
      for (var j = 0; j < level[i].length; j++) {

        // Create a wall and add it to the 'walls' group
        if (level[i][j] == 'x') {
          var wall = game.add.sprite(32+32*j, 32+32*i, 'wall');
          wallGroup.add(wall);
          wall.body.immovable = true;
        }
      }
    }



  },

  update: function() {
    player.body.velocity.setTo(0, 0);
    player.body.angularVelocity = 0;

    game.physics.arcade.collide(player, testSprite, collidePerson, null, this);
    game.physics.arcade.collide(player, turtle, this.stateChangeCollision, null, this);
    game.physics.arcade.collide(player, wallGroup, wallCollision, null, this);
    game.physics.arcade.collide(player, NpcTest, npcCollision, null, this);

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


  stateChangeCollision: function(obj1, obj2){
    if (!completedPuzzle1) {
        playerX = obj1.body.center.x;
        playerY = obj2.body.center.y;
        game.state.start('Image');
    }
  }
}
