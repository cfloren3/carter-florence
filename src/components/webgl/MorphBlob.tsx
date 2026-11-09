"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SIMPLEX, PALETTE, glState } from "@/lib/webgl";

const vert = /* glsl */ `
uniform float uTime; uniform float uHover;
varying vec3 vNormal; varying vec3 vView; varying float vDisp;
${SIMPLEX}
void main(){
  float t = uTime * 0.22;
  float d = snoise(normal * 1.1 + vec3(t, t*0.8, -t)) * (0.17 + uHover * 0.06)
          + snoise(normal * 2.4 - t * 1.2) * 0.022;
  vDisp = d;
  vec3 p = position + normal * d;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  vNormal = normalize(normalMatrix * normal);
  vView = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}`;
const frag = /* glsl */ `
varying vec3 vNormal; varying vec3 vView; varying float vDisp;
void main(){
  vec3 ink   = vec3(${PALETTE.ink.join(",")});
  vec3 blush = vec3(${PALETTE.blush.join(",")});
  vec3 sage  = vec3(${PALETTE.sage.join(",")});
  vec3 paper = vec3(${PALETTE.paper.join(",")});
  float fres = pow(1.0 - max(dot(vNormal, vView), 0.0), 2.4);
  vec3 col = mix(ink * 1.25, sage * 0.55, smoothstep(-0.2, 0.3, vDisp));
  col = mix(col, blush, fres * 0.85);
  float spec = pow(max(dot(reflect(-normalize(vec3(-0.4, 0.6, 1.0)), vNormal), vView), 0.0), 24.0);
  col += paper * spec * 0.35;
  gl_FragColor = vec4(col, 1.0);
}`;

function Blob() {
  const mesh = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(() => ({ uTime: { value: 0 }, uHover: { value: 0 } }), []);
  useFrame((_, dt) => {
    if (!mesh.current || !mat.current) return;
    mat.current.uniforms.uTime.value += Math.min(dt, 0.05);
    const { x, y } = glState.pointer;
    mesh.current.rotation.y += (x * 0.6 - mesh.current.rotation.y) * 0.04;
    mesh.current.rotation.x += (-y * 0.4 - mesh.current.rotation.x) * 0.04;
    const near = Math.max(0, 1 - Math.hypot(x - 0.55, y - 0.2));
    mat.current.uniforms.uHover.value += (near - mat.current.uniforms.uHover.value) * 0.05;
  });
  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[1, 64]} />
      <shaderMaterial ref={mat} vertexShader={vert} fragmentShader={frag} uniforms={uniforms} />
    </mesh>
  );
}

/** A slow liquid form in charcoal, sage and blush that turns toward the cursor. */
export default function MorphBlob() {
  return (
    <Canvas style={{ position: "absolute", inset: 0 }} dpr={[1, 1.75]} gl={{ antialias: true, alpha: true }} camera={{ position: [0, 0, 3.4], fov: 35 }}>
      <Blob />
    </Canvas>
  );
}
