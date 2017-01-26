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
