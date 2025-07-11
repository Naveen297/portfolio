// src/Sections/ExperienceSection/AmazingBackground.jsx

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

// This is the GLSL shader code for our effect
const AmazingShaderMaterial = shaderMaterial(
  // Uniforms: values we can pass from React to the shader
  {
    u_time: 0,
    u_mouse: new THREE.Vector2(0, 0),
    u_resolution: new THREE.Vector2(window.innerWidth, window.innerHeight),
    u_color1: new THREE.Color('#22d3ee'), // Cyan
    u_color2: new THREE.Color('#a855f7'), // Purple
    u_color3: new THREE.Color('#ec4899'), // Pink
  },
  // Vertex Shader: Positions the vertices of our plane
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader: Colors each pixel of our plane
  `
    uniform float u_time;
    uniform vec2 u_mouse;
    uniform vec2 u_resolution;
    uniform vec3 u_color1;
    uniform vec3 u_color2;
    uniform vec3 u_color3;
    varying vec2 vUv;

    // 2D Noise function
    float noise(vec2 p) {
      return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
    }

    // Fractal Brownian Motion (to create the cloudy effect)
    float fbm(vec2 p) {
      float value = 0.0;
      float amplitude = 0.5;
      for (int i = 0; i < 6; i++) {
        value += amplitude * noise(p);
        p *= 2.0;
        amplitude *= 0.5;
      }
      return value;
    }

    void main() {
      // Animate the UV coordinates over time and with mouse interaction
      vec2 a = vec2(vUv.x, vUv.y);
      vec2 b = vec2(vUv.y, vUv.x);
      vec2 st = (vUv * 2.0 - 1.0) * (1.0 + u_mouse.y * 0.1);
      st.x *= u_resolution.x / u_resolution.y;

      float time = u_time * 0.1;
      
      // Create a swirling, distorted coordinate system
      vec2 q = vec2(fbm(st + time), fbm(st + time + 1.0));
      vec2 r = vec2(fbm(st + q + time * 0.7), fbm(st + q - time * 0.5));
      
      // Mix the colors based on the noise patterns
      vec3 color_mix1 = mix(u_color1, u_color2, smoothstep(0.1, 0.6, r.x));
      vec3 final_color = mix(color_mix1, u_color3, smoothstep(0.3, 0.8, r.y));
      
      float intensity = fbm(st + r);
      
      gl_FragColor = vec4(final_color * intensity * 2.5, 1.0);
    }
  `
);

extend({ AmazingShaderMaterial });

const ShaderPlane = () => {
  const ref = useRef();
  const mouse = useRef(new THREE.Vector2(0,0));

  // Update uniforms on each frame
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.material.uniforms.u_time.value += delta;
      // Smoothly interpolate mouse position for a softer effect
      ref.current.material.uniforms.u_mouse.value.lerp(mouse.current, 0.05);
    }
  });

  // Track mouse movement
  const onMouseMove = (e) => {
      // Normalize mouse coordinates (-1 to 1)
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
  };

  return (
    <mesh ref={ref} onPointerMove={onMouseMove}>
      <planeGeometry args={[10, 10, 64, 64]} />
      <amazingShaderMaterial />
    </mesh>
  );
};

const AmazingBackground = () => {
  return (
    <Canvas camera={{ position: [0, 0, 1.5], fov: 50 }}>
      <ShaderPlane />
    </Canvas>
  );
};

export default AmazingBackground;