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

