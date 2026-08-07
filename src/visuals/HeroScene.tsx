import { useEffect, useRef } from "react";
import type * as ThreeTypes from "three";

export function HeroScene() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    let disposed = false;
    let cleanup: (() => void) | undefined;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!mount || reduceMotion) return undefined;

    void import("three").then((THREE) => {
      if (disposed || !mount) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(38, mount.clientWidth / mount.clientHeight, 0.1, 100);
      camera.position.z = 8;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      mount.appendChild(renderer.domElement);

      const signalSystem = new THREE.Group();
      signalSystem.position.set(1.9, -0.08, -0.45);
      signalSystem.scale.setScalar(0.86);
      scene.add(signalSystem);

      const makeLine = (points: Array<ThreeTypes.Vector3>, color: number, opacity: number) => {
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({
          color,
          transparent: true,
          opacity,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        const line = new THREE.Line(geometry, material);
        signalSystem.add(line);
        return line;
      };

      const sampleEllipse = (radiusX: number, radiusY: number, rotation: number, z: number) => {
        const curve = new THREE.EllipseCurve(0, 0, radiusX, radiusY, 0, Math.PI * 2, false, 0);
        return curve.getPoints(180).map((point) => {
          const x = point.x * Math.cos(rotation) - point.y * Math.sin(rotation);
          const y = point.x * Math.sin(rotation) + point.y * Math.cos(rotation);
          return new THREE.Vector3(x, y, z);
        });
      };

      const uCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-1.35, 1.34, 0),
        new THREE.Vector3(-1.36, 0.44, 0.08),
        new THREE.Vector3(-1.18, -1.22, 0.05),
        new THREE.Vector3(-0.52, -1.86, 0),
        new THREE.Vector3(0, -1.98, 0.04),
        new THREE.Vector3(0.52, -1.86, 0),
        new THREE.Vector3(1.18, -1.22, 0.05),
        new THREE.Vector3(1.36, 0.44, 0.08),
        new THREE.Vector3(1.35, 1.34, 0),
      ]);
      const uPoints = uCurve.getPoints(180);

      const innerUCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.76, 1.08, 0.05),
        new THREE.Vector3(-0.76, -0.56, 0.02),
        new THREE.Vector3(-0.45, -1.15, 0.07),
        new THREE.Vector3(0, -1.28, 0.02),
        new THREE.Vector3(0.45, -1.15, 0.07),
        new THREE.Vector3(0.76, -0.56, 0.02),
        new THREE.Vector3(0.76, 1.08, 0.05),
      ]);

      const orbitA = makeLine(sampleEllipse(2.75, 0.72, -0.18, -0.32), 0x66e9ff, 0.16);
      const orbitB = makeLine(sampleEllipse(2.2, 1.08, 0.42, -0.22), 0x86ffb6, 0.1);
      const outerU = makeLine(uPoints, 0x66e9ff, 0.26);
      const innerU = makeLine(innerUCurve.getPoints(140), 0xf6f8fb, 0.1);
      const ikStem = makeLine([new THREE.Vector3(-0.08, 1.25, 0.16), new THREE.Vector3(-0.08, -0.98, 0.16)], 0xf6f8fb, 0.12);
      const ikK = makeLine(
        [
          new THREE.Vector3(0.18, 0.28, 0.18),
          new THREE.Vector3(0.78, 1.08, 0.18),
          new THREE.Vector3(0.2, 0.18, 0.18),
          new THREE.Vector3(0.86, -0.96, 0.18),
        ],
        0x86ffb6,
        0.16,
      );

      const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0x66e9ff,
        transparent: true,
        opacity: 0.055,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const halo = new THREE.Mesh(new THREE.RingGeometry(1.85, 1.91, 160), glowMaterial);
      halo.scale.set(1.42, 0.5, 1);
      halo.rotation.z = -0.18;
      halo.position.z = -0.38;
      signalSystem.add(halo);

      const particleGeometry = new THREE.SphereGeometry(0.025, 12, 12);
      const particleMaterial = new THREE.MeshBasicMaterial({
        color: 0x86ffb6,
        transparent: true,
        opacity: 0.48,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const particles = new THREE.InstancedMesh(particleGeometry, particleMaterial, 42);
      const dummy = new THREE.Object3D();
      signalSystem.add(particles);

      const sparkGeometry = new THREE.SphereGeometry(0.013, 8, 8);
      const sparkMaterial = new THREE.MeshBasicMaterial({
        color: 0xf6f8fb,
        transparent: true,
        opacity: 0.32,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const sparks = new THREE.InstancedMesh(sparkGeometry, sparkMaterial, 72);
      signalSystem.add(sparks);

      const palette = [new THREE.Color(0x66e9ff), new THREE.Color(0x86ffb6), new THREE.Color(0xaa9cff), new THREE.Color(0xf6f8fb)];
      for (let i = 0; i < particles.count; i += 1) particles.setColorAt(i, palette[i % palette.length]);

      let frame = 0;
      const animate = () => {
        frame = requestAnimationFrame(animate);
        const time = performance.now() * 0.001;

        signalSystem.rotation.y = Math.sin(time * 0.18) * 0.08;
        signalSystem.rotation.x = Math.sin(time * 0.16) * 0.025;
        orbitA.rotation.z = time * 0.018;
        orbitB.rotation.z = -time * 0.022;
        halo.rotation.z = -0.18 + Math.sin(time * 0.32) * 0.018;

        for (let i = 0; i < particles.count; i += 1) {
          const path = i % 3 === 0 ? innerUCurve : uCurve;
          const point = path.getPoint((time * 0.018 + i / particles.count) % 1);
          const pulse = 0.5 + Math.sin(time * 1.25 + i) * 0.12;
          dummy.position.copy(point);
          dummy.position.z += Math.sin(time + i) * 0.12;
          dummy.scale.setScalar(pulse);
          dummy.updateMatrix();
          particles.setMatrixAt(i, dummy.matrix);
        }
        particles.instanceMatrix.needsUpdate = true;

        for (let i = 0; i < sparks.count; i += 1) {
          const angle = i * 2.399 + time * (0.065 + (i % 5) * 0.006);
          const radius = 0.85 + (i % 12) * 0.17;
          dummy.position.set(Math.cos(angle) * radius, Math.sin(angle * 0.74) * radius * 0.46, -0.5 + (i % 7) * 0.08);
          dummy.scale.setScalar(0.48 + Math.sin(time * 0.9 + i) * 0.14);
          dummy.updateMatrix();
          sparks.setMatrixAt(i, dummy.matrix);
        }
        sparks.instanceMatrix.needsUpdate = true;

        renderer.render(scene, camera);
      };

      const resize = () => {
        if (!mount.clientWidth || !mount.clientHeight) return;
        camera.aspect = mount.clientWidth / mount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mount.clientWidth, mount.clientHeight);
      };

      window.addEventListener("resize", resize);
      animate();

      cleanup = () => {
        cancelAnimationFrame(frame);
        window.removeEventListener("resize", resize);
        renderer.dispose();
        particleGeometry.dispose();
        particleMaterial.dispose();
        sparkGeometry.dispose();
        sparkMaterial.dispose();
        glowMaterial.dispose();
        [orbitA, orbitB, outerU, innerU, ikStem, ikK].forEach((line) => {
          line.geometry.dispose();
          if (Array.isArray(line.material)) {
            line.material.forEach((material) => material.dispose());
          } else {
            line.material.dispose();
          }
        });
        if (renderer.domElement.parentElement === mount) {
          mount.removeChild(renderer.domElement);
        }
      };
    });

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return (
    <div className="hero-backdrop" aria-hidden="true">
      <div className="three-scene brand-signal-scene" ref={mountRef} />
      <div className="hero-grid" />
      <div className="ambient-thread thread-one" />
      <div className="ambient-thread thread-two" />
      <div className="ambient-thread thread-three" />
    </div>
  );
}
