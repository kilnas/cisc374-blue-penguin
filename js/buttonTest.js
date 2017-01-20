
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.spritesheet('button', 'assets/buttons/button_sprite_sheet.png', 193, 71);
    game.load.spritesheet('emptyButton', 'assets/buttons/flixel-button.png', 80, 20);
    game.load.image('background','assets/misc/starfield.jpg');
    game.load.image('metal', 'assets/textures/metal.png');


}

var blurButton;
var background;
var filter;
var sprite;
var isFiltered;
var style;
var text;

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

    // background = game.add.tileSprite(0, 0, 800, 600, 'background');

    sprite = game.add.sprite(0, 0, 'metal');
    blurFilter = new Phaser.Filter(game, null, blurShader);
    normalFilter = new Phaser.Filter(game, null, normalShader);

    style = { font: "65px Arial", fill: "#ff0044", align: "center" };

    // text = game.add.text(game.world.centerX, game.world.centerY, "- phaser -\nwith a sprinkle of\npixi dust", style);


    blurButton = game.add.button(game.world.centerX + 150, 200, 'button', actionOnClick, this, 2, 1, 0);


    this.btnStart = new LabelButton(game, 480, 512, "emptyButton", "BLUR", doBtnStartHandler, this, 1, 0, 2); // button frames 1=over, 0=off, 2=down

    isFiltered = false;

    sprite.filters = null;
    console.log(sprite.filters);

}

function actionOnClick () {

    // background.visible =! background.visible;
    if (!isFiltered) {
        sprite.filters = [ blurFilter ];

        console.log(blurFilter);
        isFiltered = true;
    }
    else {
        sprite.filters = [ normalFilter ];
        sprite.filters = null;
        blurFilter.destroy();
        console.log(sprite.filters);
        console.log(blurFilter);
        isFiltered = false;
    }

}

function blurImage() {
    
}

function doBtnStartHandler () {

}

function update() {
    sprite.filters.update()
}