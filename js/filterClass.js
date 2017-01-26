


function filterClass(game, imageKey, shaders) {
    this.game = game;
    this.imageKey = imageKey;
    var cleanImage = null; 
    var filterImage = null;
  this.filters = [];
  this.shaders = shaders;
  

    var cameraTopX = game.camera.x + (game.width/2) - (game.camera.width/2); 
    var cameraTopY = game.camera.y + (game.height/2) - (game.camera.height/2);


    this.setup = function() {
      
      this.makeFilters();
      this.setupImages(game, this.imageKey, this.filters);
      this.setupButtons();
    }

  
  //make array of filters from the shader array
  this.makeFilters = function(){
    for (var i=0; i < this.shaders.length; i++){
      this.filters[i] = new Phaser.Filter(game, null, this.shaders[i][0]);
      this.filters[i].name = this.shaders[i][1];
    }
  }
  
  
  //make a button for each filter in our filters array. also makes undo and complete buttons
  this.setupButtons = function(){
    var yloc = 310;
    var xspace = 100;
    var side = 1;
    
    for (var i=0; i < this.filters.length; i++){
      if(this.filters.length == 1 || i==0){
        side = 0; //middle
      }
      else if(i%2 == 0){
        side = 1; //right side
      }
      else{
        side = -1; //left side
      }
      
      
    var newButton = new FilterButton(game, cameraTopX + (game.camera.width/2) + xspace*side*(Math.round(i/2)+1), cameraTopY + yloc, "emptyButton", this.filters[i].name, this.filters[i], newButton);
      newButton.button.scale.setTo(2,2);
    }
    
    var undoButton;
    undoButton = new LabelButton(game, cameraTopX + (game.camera.width/2), cameraTopY + 380, "emptyButton", "UNDO", undoOnClick, undoButton);
    undoButton.scale.setTo(2,2);
    
    var completeButton;
    completeButton = new LabelButton(game, cameraTopX + (game.camera.width/2), cameraTopY + 450, "emptyButton", "COMPLETE", completeFilter, completeButton);
    completeButton.scale.setTo(2,2);
  }
  
  
  //FilterButton is a container class that holds a LabelButton (set up for filtering) and other variables, like the filter object to be applied.
    var FilterButton = function(game, x, y, key, label, filter, overFrame, outFrame, downFrame, upFrame){
        this.filter = filter;
        //note: callbackContext is the FilterButton instance, not the LabelButton
        this.button = new LabelButton(game, x, y, key, label, filterOnClick, this, overFrame, outFrame, downFrame, upFrame)
        
    };


    //applies a filter from a FilterButton to an image (currently only applies one filter at a time)
    this.applyFilter = function(image, newFilter){
        //toggle on
        if(!image.isFiltered){
            image.filters = [ newFilter ];
            image.isFiltered = true;
        }
        
        //toggle off
        else{
            image.filters = null;
            image.isFiltered = false;
            
        }
    }

    this.setupImages = function(game, imageKey, filters) {
        cleanImage = game.add.sprite(cameraTopX, cameraTopY, imageKey);
        cleanImage.scale.setTo(0.5, 0.5);
        filterImage = game.add.sprite(cameraTopX, cameraTopY, imageKey);
        filterImage.scale.setTo(0.5, 0.5);
        filterImage.x = cameraTopX + game.camera.width - filterImage.width;
      
      for (var i=0; i < filters.length; i++){
        pushFilter(filterImage, filters[i]);
      }
    }

    function pushFilter(image, filter) {
        if (image.filters == null) {
            image.filters = [ filter ];
        }
        else {
            image.filters.push(filter);
            image.filters = image.filters;
        }
    }

    function popFilter(image) {
        if (image.filters != null) {
            if (image.filters.length <= 1) {
                image.filters = null;
            }
            else {
                image.filters.pop(image);
                image.filters = image.filters;
            }
        }
        
    }


    //default callback for FilterButtons
    function filterOnClick(){
        // applyFilter(cleanImage, this.filter);
        pushFilter(cleanImage, this.filter);
        this.button.frame = this.button.frame == 2 ? 0 : 2;
    }

    function undoOnClick() {
        popFilter(cleanImage);
        this.frame = this.frame == 2 ? 0 : 2;
    }

    function completeFilter() {
        if (compareImages(cleanImage, filterImage)) {
            completedPuzzle1 = true;
            game.state.start("GameOver");
        }
    }

    }

