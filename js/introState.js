var introState = {
  create: function(){
    var labelButton = new LabelButton(game, 80, 520, "emptyButton", "Next", this.changetext, this);

    var introSlideText = game.add.text(80, 80, intro2[0], {font: "25px Arial", fill: "#ffffff" });
    var textIndex = 0;
    var textBoxLength = intro2.length;
  },

  toMain: function(){
    game.state.start("Main");
  },

  changeText: function(){
    if(textIndex == textBoxLength-1){
      this.toMain;
    }
    else{
      textIndex += 1;
      introSlideText.setText(intro2[textIndex]);
    }
  }
}
