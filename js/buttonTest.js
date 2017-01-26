
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.spritesheet('button', 'assets/buttons/button_sprite_sheet.png', 193, 71);
    game.load.spritesheet('emptyButton', 'assets/buttons/flixel-button.png', 80, 20);
    game.load.image('background','assets/misc/starfield.jpg');
    game.load.image('metal', 'assets/textures/metal.png');
    game.load.image('turtle', 'assets/turtles/turtle_1.jpg');


}

var blurButton;
var background;
var filter;
var sprite;
var filteredSprite;
var text;

var cleanImage;
var filterImage;

function create() {

       var blurShader = [
        "precision mediump float;",

        "varying vec2 vTextureCoord;",

        "uniform sampler2D uSampler;",

        "void main(void) {",

            "vec4 sum = vec4(0.0);",

            "vec2 tc = vTextureCoord;",

            "float resolution = 600.0;",
            "float radius = 2.0;",
            "vec2 dir = vec2(1.0, 1.0);",

            "float blur = radius/resolution;",

            "float hstep = dir.x;",
            "float vstep = dir.y;",

            "sum += texture2D(uSampler, vec2(tc.x - 4.0*blur*hstep, tc.y - 4.0*blur*vstep)) * 0.0162162162;",
            "sum += texture2D(uSampler, vec2(tc.x - 3.0*blur*hstep, tc.y - 3.0*blur*vstep)) * 0.0540540541;",
            "sum += texture2D(uSampler, vec2(tc.x - 2.0*blur*hstep, tc.y - 2.0*blur*vstep)) * 0.1216216216;",
            "sum += texture2D(uSampler, vec2(tc.x - 1.0*blur*hstep, tc.y - 1.0*blur*vstep)) * 0.1945945946;",

            "sum += texture2D(uSampler, vec2(tc.x, tc.y)) * 0.2270270270;",

            "sum += texture2D(uSampler, vec2(tc.x + 1.0*blur*hstep, tc.y + 1.0*blur*vstep)) * 0.1945945946;",
            "sum += texture2D(uSampler, vec2(tc.x + 2.0*blur*hstep, tc.y + 2.0*blur*vstep)) * 0.1216216216;",
            "sum += texture2D(uSampler, vec2(tc.x + 3.0*blur*hstep, tc.y + 3.0*blur*vstep)) * 0.0540540541;",
            "sum += texture2D(uSampler, vec2(tc.x + 4.0*blur*hstep, tc.y + 4.0*blur*vstep)) * 0.0162162162;",

            //discard alpha for our simple demo, multiply by vertex color and return
            // "gl_FragColor = vec4(sum.rgb, 1.0);",
            "gl_FragColor = sum;",

        "}",

    ];

    var grayscaleShader = [
        "precision mediump float;",

        "varying vec2 vTextureCoord;",

        "uniform sampler2D uSampler;",

        "void main(void) {",

            "vec4 color = vec4(0.0);",

            "vec2 tc = vTextureCoord;",

            "float sum = 0.0;",
            "float average = 0.0;",

            "color = texture2D(uSampler, tc);",
            "sum = color.x + color.y + color.z;",
            "average = sum / 3.0;",

            "gl_FragColor = vec4(average, average, average, 0.0);",

        "}",

    ];

    var arithmeticAddShader = [
        "precision mediump float;",

        "varying vec2 vTextureCoord;",

        "uniform sampler2D uSampler;",

        "void main(void) {",

            "vec4 color = vec4(0.0);",

            "color = texture2D(uSampler, vTextureCoord);",

            "color.x = (color.x * 256.0 + 10.0) / 256.0;",
            "color.y = (color.y * 256.0 + 10.0) / 256.0;",
            "color.z = (color.z * 256.0 + 10.0) / 256.0;",

            "gl_FragColor = color;",

        "}",

    ];

    var arithmeticSubShader = [
        "precision mediump float;",

        "varying vec2 vTextureCoord;",

        "uniform sampler2D uSampler;",

        "void main(void) {",

            "vec4 color = vec4(0.0);",

            "color = texture2D(uSampler, vTextureCoord);",

            "color.x = (color.x * 256.0 - 10.0) / 256.0;",
            "color.y = (color.y * 256.0 - 10.0) / 256.0;",
            "color.z = (color.z * 256.0 - 10.0) / 256.0;",

            "gl_FragColor = color;",

        "}",

    ];

    var removeRedShader = [
        "precision mediump float;",

        "varying vec2 vTextureCoord;",

        "uniform sampler2D uSampler;",

        "void main(void) {",

            "vec4 color = vec4(0.0);",

            "color = texture2D(uSampler, vTextureCoord);",

            "gl_FragColor = vec4(0.0, color.y, color.z, 0.0);",

        "}",

    ];

    var sobelShader = [
        "precision mediump float;",

        "varying vec2 vTextureCoord;",

        "uniform sampler2D uSampler;",

        "void main(void) {",

            "vec2 resolution = vec2(800, 600);",
            "float x = 1.0 / resolution.x;",
            "float y = 1.0 / resolution.y;",

            "vec2 tc = vTextureCoord;",

            "vec4 horizEdge = vec4( 0.0 );",
	          "horizEdge -= texture2D( uSampler, vec2( tc.x - x, tc.y - y ) ) * 1.0;",
	          "horizEdge -= texture2D( uSampler, vec2( tc.x - x, tc.y     ) ) * 2.0;",
	          "horizEdge -= texture2D( uSampler, vec2( tc.x - x, tc.y + y ) ) * 1.0;",
	          "horizEdge += texture2D( uSampler, vec2( tc.x + x, tc.y - y ) ) * 1.0;",
	          "horizEdge += texture2D( uSampler, vec2( tc.x + x, tc.y     ) ) * 2.0;",
	          "horizEdge += texture2D( uSampler, vec2( tc.x + x, tc.y + y ) ) * 1.0;",
	          "vec4 vertEdge = vec4( 0.0 );",
	          "vertEdge -= texture2D( uSampler, vec2( tc.x - x, tc.y - y ) ) * 1.0;",
	          "vertEdge -= texture2D( uSampler, vec2( tc.x    , tc.y - y ) ) * 2.0;",
	          "vertEdge -= texture2D( uSampler, vec2( tc.x + x, tc.y - y ) ) * 1.0;",
	          "vertEdge += texture2D( uSampler, vec2( tc.x - x, tc.y + y ) ) * 1.0;",
	          "vertEdge += texture2D( uSampler, vec2( tc.x    , tc.y + y ) ) * 2.0;",
	          "vertEdge += texture2D( uSampler, vec2( tc.x + x, tc.y + y ) ) * 1.0;",
	          "vec3 edge = sqrt((horizEdge.rgb * horizEdge.rgb) + (vertEdge.rgb * vertEdge.rgb));",

            "gl_FragColor = vec4(edge, 0.0);",

        "}",

    ];

    var removeGreenShader = [
        "precision mediump float;",

        "varying vec2 vTextureCoord;",

        "uniform sampler2D uSampler;",

        "void main(void) {",

            "vec4 color = vec4(0.0);",

            "color = texture2D(uSampler, vTextureCoord);",

            "gl_FragColor = vec4(color.x, 0.0, color.z, 0.0);",

        "}",

    ];

    var removeBlueShader = [
        "precision mediump float;",

        "varying vec2 vTextureCoord;",

        "uniform sampler2D uSampler;",

        "void main(void) {",

            "vec4 color = vec4(0.0);",

            "color = texture2D(uSampler, vTextureCoord);",

            "gl_FragColor = vec4(color.x, color.y, 0.0, 0.0);",

        "}",

    ];

    var normalShader = [

        "precision mediump float;",

        "varying vec2 vTextureCoord;",
        "uniform sampler2D uSampler;",

        "void main(void) {",

            "vec4 texColor = texture2D(uSampler, vTextureCoord);",

            "gl_FragColor = texColor;",

        "}",

    ];

    game.stage.backgroundColor = '#182d3b';


    // blurFilter = new Phaser.Filter(game, null, blurShader);
    blurFilter = new Phaser.Filter(game, null, sobelShader);

    normalFilter = new Phaser.Filter(game, null, normalShader);


    setupImages(game, 'turtle', blurFilter);


    var Dbutton;
    Dbutton = new FilterButton(game, game.math.roundTo(game.width/2), 312, "emptyButton", "BLUR", blurFilter, Dbutton);
    Dbutton.button.scale.setTo(2,2);

    var undoButton;
    undoButton = new LabelButton(game, game.math.roundTo(game.width/2), 380, "emptyButton", "UNDO", undoOnClick, undoButton);
    undoButton.scale.setTo(2,2);

}


// button frames 1=over, 0=off, 2=down

//FilterButton is a container class that holds a LabelButton (set up for filtering) and other variables, like the filter object to be applied.
var FilterButton = function(game, x, y, key, label, filter, overFrame, outFrame, downFrame, upFrame){
    this.filter = filter;
    //note: callbackContext is the FilterButton instance, not the LabelButton
    this.button = new LabelButton(game, x, y, key, label, filterOnClick, this, overFrame, outFrame, downFrame, upFrame)

};


//applies a filter from a FilterButton to an image (currently only applies one filter at a time)
function applyFilter(image, newFilter){
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

function setupImages(game, imageKey, filters) {
    cleanImage = game.add.sprite(0, 0, imageKey);
    cleanImage.scale.setTo(0.5, 0.5);
    filterImage = game.add.sprite(game.world.centerX + 200, 0, imageKey);
    filterImage.scale.setTo(0.5, 0.5);
    filterImage.x = game.world.width - filterImage.width;
    applyFilter(filterImage, filters);
}

function pushFilter(image, filter) {
    if (image.filters == null) {
        image.filters = [ filter ];
    }
    else {
        image.filters.push(filter);
        image.filters = image.filters;
        console.log(image.filters);
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



function update() {
    // cleanImage.filters.update()
}
