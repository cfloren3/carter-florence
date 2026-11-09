"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { SIMPLEX, glState, prng } from "@/lib/webgl";

const vert = /* glsl */ `
uniform float uTime; uniform vec2 uMouse; uniform float uAspect; uniform float uDpr; uniform float uIntro;
attribute vec3 aSeed; varying float vAlpha;
${SIMPLEX}
void main(){
  vec2 p = position.xy;
  float t = uTime * 0.05;
  // slow curl-like drift
  p += 0.06 * vec2(snoise(vec3(p*1.3, t + aSeed.x*10.0)), snoise(vec3(p*1.3 + 7.1, t + aSeed.y*10.0)));
  // the cursor parts the field
  vec2 m = vec2(uMouse.x * uAspect, uMouse.y);
  vec2 d = p - m; float r = length(d);
  p += normalize(d + 1e-4) * smoothstep(0.42, 0.0, r) * 0.16;
  // gather in from a wider spread on load
  p *= mix(1.6, 1.0, uIntro);
  gl_Position = vec4(p.x / uAspect, p.y, 0.0, 1.0);
  gl_PointSize = (1.2 + aSeed.z * 2.4) * uDpr;
  vAlpha = (0.16 + aSeed.z * 0.34) * uIntro * (0.55 + 0.45 * smoothstep(0.0, 0.5, r));
}`;
const frag = /* glsl */ `
varying float vAlpha;
void main(){
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  gl_FragColor = vec4(0.125, 0.137, 0.129, vAlpha * smoothstep(0.5, 0.15, d));
}`;

function Points({ count }: { count: number }) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const { size, viewport } = useThree();
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const seed = new Float32Array(count * 3);
    const rnd = prng(7);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (rnd() * 2 - 1) * 2.2;
      pos[i * 3 + 1] = rnd() * 2 - 1;
      seed[i * 3] = rnd();
      seed[i * 3 + 1] = rnd();
      seed[i * 3 + 2] = Math.pow(rnd(), 3);
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seed, 3));
    return g;
  }, [count]);
  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uMouse: { value: new THREE.Vector2() }, uAspect: { value: 1 }, uDpr: { value: 1 }, uIntro: { value: 0 } }),
    []
  );
  useFrame((_, dt) => {
    const u = mat.current?.uniforms;
    if (!u) return;
    u.uTime.value += Math.min(dt, 0.05);
    u.uAspect.value = size.width / size.height;
    u.uDpr.value = viewport.dpr;
    u.uMouse.value.set(glState.pointer.x, glState.pointer.y);
    u.uIntro.value += (1 - u.uIntro.value) * 0.02;
  });
  return (
    <points geometry={geo} frustumCulled={false}>
      <shaderMaterial ref={mat} vertexShader={vert} fragmentShader={frag} uniforms={uniforms} transparent depthWrite={false} />
    </points>
  );
}

/** A sparse drifting particle field around the hero that parts for the cursor. */
export default function HeroParticles() {
  const count = typeof window !== "undefined" && window.innerWidth < 768 ? 500 : 1400;
  return (
    <Canvas style={{ position: "absolute", inset: 0 }} dpr={[1, 1.75]} gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }} orthographic camera={{ position: [0, 0, 1] }}>
      <Points count={count} />
    </Canvas>
  );
}
