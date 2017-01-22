

var Textbox = function(x, y, messageArray){
  this.x = game.camera.width / 2;
  this.y = game.camera.height / 2;
  this.content = messageArray;
  this.isShowing = false;






  this.createText = function(){ //newX, newY
    //console.log(newX);
    //this.x = newX;
    //this.y = newY;
    // background overlay of text
    this.textBG = game.add.sprite(this.x, this.y, 'pic'); //player.x, player.y
    this.textBG.scale.setTo(.8, .8);
    this.textBG.x = this.textBG.x - this.textBG.width/2;
    this.textBG.y = this.textBG.y - this.textBG.height/2;
    this.textBG.alpha = .8;
    //this.text = null;
    this.text = game.add.text(this.x, this.y, ''); //player.x, player.y
    this.text.anchor.setTo(0.5);
    this.text.font = 'Coming Soon';
    this.text.fontSize = 25;
    this.text.backgroundColor = '#ffff00';
    this.text.fill = '#FFFFFF';
    this.text.align = 'center';
    this.text.stroke = '#000000';
    this.text.strokeThickness = 2;
    this.text.setShadow(2, 2, 'rgba(0,0,0,0.5)', 5);
    this.text.wordWrap = true;
    this.text.wordWrapWidth = 500;


    this.nextLine();
    createTextFlag = true;
  }


  this.removeText = function(){
    console.log('removerlaksjl');
    if(!(typeof textBG === "undefined")){
      //this.textBG.destroy();
      this.textBG.alpha = 0;
      this.text.alpha = 0; //destroy();
      createTextFlag = false;
    }
  }





  this.nextLine = function() {
      if (lineIndex === this.content.length)
      {
          return;
      }
      //  Split the current line on spaces, so one word per array element
      line = this.content[lineIndex].split(' '); //content
      //  Reset the word index to zero (the first word in the line)
      wordIndex = 0;
      //  Call the 'nextWord' function once for each word in the line (line.length)
      game.time.events.repeat(wordDelay, line.length, this.nextWord, this);
      //  Advance to the next line
      lineIndex++;
  }




  this.nextWord = function() {
      //  Add the next word onto the text string, followed by a space
      this.text.text = this.text.text.concat(line[wordIndex] + " ");
      //  Advance the word index to the next word in the line
      wordIndex++;
      //  Last word?
      if (wordIndex === line.length)
      {
          //  Add a carriage return
          this.text.text = this.text.text.concat("\n");
          //  Get the next line after the lineDelay amount of ms has elapsed
          game.time.events.add(lineDelay, this.nextLine, this);
      }
  }
}
