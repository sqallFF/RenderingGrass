uniform sampler2D grassTexture; // The grass texture
varying float vHeight; // Height passed from the vertex shader
varying vec2 vUv;
uniform float uTime; 

void main() {
      vec4 texColor = texture2D(grassTexture, vUv);

   
if (texColor.a < 0.5) // Discard the fragment if the alpha value is low
        discard;
    // Apply color and other effects based on vHeight if needed
    // For now, just using the texture color
    gl_FragColor = texColor ;
}