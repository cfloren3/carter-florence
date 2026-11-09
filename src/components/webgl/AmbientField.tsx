"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { SIMPLEX, PALETTE, glState } from "@/lib/webgl";

const frag = /* glsl */ `
precision highp float;
uniform float uTime; uniform vec2 uRes; uniform vec2 uMouse; uniform float uScroll;
varying vec2 vUv;
${SIMPLEX}
float fbm(vec3 p){ float a=0.5, s=0.0; for(int i=0;i<4;i++){ s+=a*snoise(p); p*=2.02; a*=0.5; } return s; }
void main(){
  vec2 asp = vec2(uRes.x/uRes.y, 1.0);
  vec2 p = (vUv - 0.5) * asp;
  vec2 m = uMouse * 0.5 * asp;
  float t = uTime * 0.035;
  // domain-warped flow; the pointer pushes the fluid gently aside
  vec2 toM = p - m; float pull = exp(-dot(toM,toM) * 6.0);
  vec2 q = vec2(fbm(vec3(p*1.1, t)), fbm(vec3(p*1.1 + 4.7, t*1.2)));
  q += normalize(toM + 1e-4) * pull * 0.35;
  float n  = fbm(vec3(p*1.25 + q*1.6, t*0.6 + uScroll*0.15));
  float n2 = fbm(vec3(p*0.8 - q + 9.1, t*0.5));
  vec3 paper = vec3(${PALETTE.paper.join(",")});
  vec3 stone = vec3(${PALETTE.stone.join(",")});
  vec3 blush = vec3(${PALETTE.blush.join(",")});
  vec3 sage  = vec3(${PALETTE.sage.join(",")});
  vec3 col = paper;
  col = mix(col, stone, smoothstep(0.05, 0.75, n) * 0.75);
  col = mix(col, blush, smoothstep(0.25, 0.9, n2) * 0.20);
  col = mix(col, sage,  smoothstep(0.35, 0.95, -n2 + n*0.4) * 0.13);
  col += pull * 0.018; // faint light where the cursor is
  gl_FragColor = vec4(col, 1.0);
}`;
const vert = /* glsl */ `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`;

function Field({ still }: { still: boolean }) {
  const ref = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();
  const uniforms = useMemo(
    () => ({ uTime: { value: 8 }, uRes: { value: new THREE.Vector2(1, 1) }, uMouse: { value: new THREE.Vector2(0, 0) }, uScroll: { value: 0 } }),
    []
  );
  useFrame((_, dt) => {
    const u = ref.current?.uniforms;
    if (!u) return;
    const pt = glState.pointer;
    pt.x += (pt.tx - pt.x) * 0.05;
    pt.y += (pt.ty - pt.y) * 0.05;
    u.uRes.value.set(size.width, size.height);
    u.uMouse.value.set(pt.x, pt.y);
    if (!still) u.uTime.value += Math.min(dt, 0.05);
    u.uScroll.value = window.scrollY / window.innerHeight;
  });
  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial ref={ref} vertexShader={vert} fragmentShader={frag} uniforms={uniforms} depthTest={false} depthWrite={false} />
    </mesh>
  );
}

/**
 * Fixed, full-viewport fluid gradient in the portrait's palette. Rendered at
 * half resolution (it's soft by nature), behind every transparent light
 * section. Static frame for reduced motion.
 */
export default function AmbientField({ still = false }: { still?: boolean }) {
  return (
    <Canvas
      style={{ position: "fixed", inset: 0, zIndex: -10 }}
      dpr={0.5}
      frameloop={still ? "demand" : "always"}
      gl={{ antialias: false, alpha: false, powerPreference: "low-power", stencil: false, depth: false }}
      orthographic
      camera={{ position: [0, 0, 1] }}
    >
      <Field still={still} />
    </Canvas>
  );
}
