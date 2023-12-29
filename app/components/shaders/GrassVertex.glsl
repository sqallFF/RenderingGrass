uniform float uTime; // Time passed since the start of the animation
varying vec2 vUv;
uniform sampler2D noiseTexture;

attribute vec3 terrPosi;

varying float vHeight; // To pass height to the fragment shader for color variation

const float PI = 3.14;
mat2 rotationMatrix(float angle)
{
	angle *= PI / 180.0;
    float s=sin(angle), c=cos(angle);
    return mat2( c, -s, 
                 s,  c );
}



void main() {
  vUv = uv;
  vec2 adjustedUV = uv + terrPosi.xy; 
     // Sample noise texture to get height displacement for the top vertices
    float noiseValue = texture2D(noiseTexture, adjustedUV).r;

    vec3 newPos = position;
    if (position.y > 0.0) { // Assuming y = 0 is the base of the plane
        newPos.y += noiseValue *2.6; // Apply height displacement
    }

    float swayFactor = 0.1; // Adjust the strength of the sway
        float swaySpeed = 2.0; // Adjust the speed of the sway

        if( position.y > 0.0 ) {
            newPos.x += sin(uTime * swaySpeed + terrPosi.x) * swayFactor;
        } 

    // Calculate the final position including the instance's position offset
    vec3 finalPos = newPos + terrPosi;
    
 


      // Vertex manipulation code here
      gl_Position = projectionMatrix * modelViewMatrix * vec4(finalPos, 1.0);
    }
