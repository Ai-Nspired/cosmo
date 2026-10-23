import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Particles, useFrame, useSceneScroll, usePagePointer, useScene } from "@wron/kit/3d/objects";
import { SIGNS, ANIMALS, NUMBER_LIST } from "../lib/engine";

const TAU = Math.PI * 2;
const STEP = TAU / 12;
const TARGET = (5 * Math.PI) / 6; // selected segments stop at the upper left
const SPEEDS = [0.05, -0.075, 0.1];
const GLYPH_FONT = '"Segoe UI Symbol","Apple Symbols","Noto Sans Symbols","DejaVu Sans",sans-serif';

const RINGS = [
  { key: "signs", inner: 1.55, outer: 2.02, z: 0, items: SIGNS.map((s) => s.glyph), glyph: true, font: 62 },
  { key: "animals", inner: 1.1, outer: 1.5, z: 0.09, items: ANIMALS, font: 40 },
  { key: "numbers", inner: 0.68, outer: 1.05, z: 0.18, items: NUMBER_LIST.map(String), font: 70 },
];
const DEPTH = 0.16;

function ringGeometry(inner, outer) {
  const shape = new THREE.Shape();
  shape.absarc(0, 0, outer, 0, TAU, false);
  const hole = new THREE.Path();
  hole.absarc(0, 0, inner, 0, TAU, true);
  shape.holes.push(hole);
  const g = new THREE.ExtrudeGeometry(shape, { depth: DEPTH, bevelEnabled: true, bevelThickness: 0.025, bevelSize: 0.018, bevelSegments: 3, curveSegments: 120 });
  g.translate(0, 0, -DEPTH / 2);
  return g;
}

function drawLabels(canvas, ring, active) {
  const S = canvas.width;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, S, S);
  const c = S / 2;
  const k = c / ring.outer;
  const ri = ring.inner * k, ro = ring.outer * k, mid = (ri + ro) / 2;
  ctx.strokeStyle = "rgba(45,212,163,0.55)";
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.arc(c, c, ro - 3, 0, TAU); ctx.stroke();
  ctx.strokeStyle = "rgba(45,212,163,0.3)";
  ctx.beginPath(); ctx.arc(c, c, ri + 3, 0, TAU); ctx.stroke();
  ctx.strokeStyle = "rgba(140,150,163,0.35)";
  ctx.lineWidth = 2;
  for (let i = 0; i < 12; i++) {
    const a = i * STEP - STEP / 2 - Math.PI / 2;
    ctx.beginPath();
    ctx.moveTo(c + Math.cos(a) * ri, c + Math.sin(a) * ri);
    ctx.lineTo(c + Math.cos(a) * ro, c + Math.sin(a) * ro);
    ctx.stroke();
  }
  if (active >= 0) {
    const a0 = active * STEP - STEP / 2 - Math.PI / 2, a1 = a0 + STEP;
    ctx.beginPath();
    ctx.arc(c, c, ro - 6, a0, a1);
    ctx.arc(c, c, ri + 6, a1, a0, true);
    ctx.closePath();
    ctx.fillStyle = "rgba(167,139,250,0.32)";
    ctx.fill();
    ctx.strokeStyle = "#C4B1FF";
    ctx.lineWidth = 6;
    ctx.stroke();
  }
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ring.items.forEach((label, i) => {
    const a = i * STEP - Math.PI / 2;
    ctx.save();
    ctx.translate(c + Math.cos(a) * mid, c + Math.sin(a) * mid);
    ctx.rotate(i * STEP);
    ctx.font = ring.glyph ? `400 ${ring.font}px ${GLYPH_FONT}` : `500 ${ring.font}px Geist, system-ui, sans-serif`;
    ctx.fillStyle = i === active ? "#FFFFFF" : ring.glyph ? "#2DD4A3" : "rgba(238,242,246,0.85)";
    ctx.fillText(label, 0, 0);
    ctx.restore();
  });
}

function Ring({ ring, active, innerRef, dim }) {
  const geo = useMemo(() => ringGeometry(ring.inner, ring.outer), [ring]);
  const face = useMemo(() => new THREE.RingGeometry(ring.inner, ring.outer, 128, 1), [ring]);
  const { canvas, texture } = useMemo(() => {
    const cv = document.createElement("canvas");
    cv.width = cv.height = 1024;
    const t = new THREE.CanvasTexture(cv);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
    return { canvas: cv, texture: t };
  }, []);
  useEffect(() => { drawLabels(canvas, ring, active); texture.needsUpdate = true; }, [canvas, texture, ring, active]);
  useEffect(() => () => { geo.dispose(); face.dispose(); texture.dispose(); }, [geo, face, texture]);
  const rim = useMemo(() => new THREE.Color("#2DD4A3").multiplyScalar(dim ? 1.2 : 2.2), [dim]);

  return (
    <group ref={innerRef} position={[0, 0, ring.z]}>
      <mesh geometry={geo}>
        <meshStandardMaterial color="#141A21" metalness={0.85} roughness={0.34} />
      </mesh>
      <mesh geometry={face} position={[0, 0, DEPTH / 2 + 0.028]}>
        <meshBasicMaterial map={texture} transparent depthWrite={false} toneMapped={false} />
      </mesh>
      <mesh position={[0, 0, DEPTH / 2]}>
        <torusGeometry args={[ring.outer + 0.005, 0.01, 8, 180]} />
        <meshBasicMaterial color={rim} toneMapped={false} transparent opacity={ring.key === "signs" ? 0.9 : 0.45} />
      </mesh>
    </group>
  );
}

export default function ProfileRings(props) {
  const p = props.sceneProps || props;
  const { aligned = false, sign = -1, animal = -1, number = -1 } = p;
  const actives = [sign, animal, number];
  const { small, reduce } = useScene();
  const scroll = useSceneScroll();
  const pointer = usePagePointer();
  const group = useRef(null);
  const refs = [useRef(null), useRef(null), useRef(null)];
  const st = useRef({ angles: [0.4, 1.3, 2.2], targets: null, key: "init" });
  const orient = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!small) return;
    const on = (e) => {
      if (e.beta == null) return;
      orient.current = { x: THREE.MathUtils.clamp(e.gamma / 45, -1, 1), y: THREE.MathUtils.clamp((e.beta - 45) / 45, -1, 1) };
    };
    window.addEventListener("deviceorientation", on);
    return () => window.removeEventListener("deviceorientation", on);
  }, [small]);

  useFrame((state, dt) => {
    const s = st.current;
    const key = aligned ? actives.join("-") : "drift";
    if (key !== s.key) {
      s.key = key;
      if (aligned) {
        s.targets = actives.map((idx, i) => {
          if (idx < 0) return s.angles[i];
          const desired = TARGET - Math.PI / 2 + idx * STEP;
          const cur = s.angles[i];
          const dir = i === 1 ? -1 : 1;
          let delta = (((desired - cur) % TAU) + TAU) % TAU;
          if (dir < 0) delta -= TAU;
          return cur + delta + dir * TAU * 0.5;
        });
      } else s.targets = null;
    }
    refs.forEach((r, i) => {
      if (!r.current) return;
      if (s.targets) s.angles[i] = reduce ? s.targets[i] : THREE.MathUtils.damp(s.angles[i], s.targets[i], 2.4, dt);
      else if (!reduce) s.angles[i] += dt * SPEEDS[i];
      r.current.rotation.z = s.angles[i];
    });

    const g = group.current;
    if (!g) return;
    const sc = scroll && typeof scroll.current === "number" ? scroll.current : 0;
    const f = THREE.MathUtils.smoothstep(sc, 0.5, 0.85);
    const ptr = pointer && pointer.current ? pointer.current : pointer || { x: 0, y: 0 };
    const px = small ? orient.current.x : ptr.x || 0;
    const py = small ? orient.current.y : ptr.y || 0;
    const tilt = reduce ? 0 : 0.07;
    const tx = THREE.MathUtils.lerp(-0.52, -0.1, f) - py * tilt;
    const ty = THREE.MathUtils.lerp(-0.42, -0.06, f) + px * tilt;
    if (reduce) { g.rotation.x = tx; g.rotation.y = ty; }
    else {
      g.rotation.x = THREE.MathUtils.damp(g.rotation.x, tx, 3, dt);
      g.rotation.y = THREE.MathUtils.damp(g.rotation.y, ty, 3, dt);
    }
  });

  const scale = small ? 0.92 : 1.12;
  return (
    <>
      <pointLight position={[-3.2, 1.2, 3]} intensity={small ? 18 : 30} color="#2DD4A3" />
      <pointLight position={[3, 2.2, -2]} intensity={24} color="#2DD4A3" />
      <pointLight position={[-2.4, 1.4, 1.6]} intensity={aligned ? 12 : 0} color="#A78BFA" />
      <group ref={group} scale={scale} rotation={[-0.52, -0.42, 0]}>
        <mesh position={[0, 0, -0.16]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[2.06, 2.1, 0.12, 120]} />
          <meshStandardMaterial color="#0C1015" metalness={0.9} roughness={0.42} />
        </mesh>
        {RINGS.map((ring, i) => (
          <Ring key={ring.key} ring={ring} active={aligned ? actives[i] : -1} innerRef={refs[i]} dim={small} />
        ))}
        <mesh position={[0, 0, 0.16]}>
          <circleGeometry args={[0.66, 64]} />
          <meshStandardMaterial color="#0B0E12" metalness={0.8} roughness={0.5} />
        </mesh>
        <mesh position={[0, 0, 0.36]}>
          <sphereGeometry args={[0.38, 64, 32]} />
          <meshStandardMaterial color="#1A222C" metalness={1} roughness={0.18} />
        </mesh>
      </group>
      <Particles count={small ? 110 : 240} color="#8C96A3" size={0.02} spread={11} shape="sphere" />
    </>
  );
}
