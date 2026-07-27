import { useEffect, useRef } from "react";

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
      const camera = new THREE.PerspectiveCamera(42, mount.clientWidth / mount.clientHeight, 0.1, 100);
      camera.position.z = 8;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      mount.appendChild(renderer.domElement);

      const group = new THREE.Group();
      scene.add(group);

      const torus = new THREE.Mesh(
        new THREE.TorusGeometry(1.85, 0.035, 16, 120),
        new THREE.MeshBasicMaterial({ color: 0x66e9ff, transparent: true, opacity: 0.38 }),
      );
      torus.rotation.x = 1.08;
      group.add(torus);

      const vertical = new THREE.Mesh(
        new THREE.BoxGeometry(0.34, 2.5, 0.12),
        new THREE.MeshStandardMaterial({ color: 0xf6f8fb, emissive: 0x143a44, roughness: 0.28, metalness: 0.35 }),
      );
      vertical.position.y = 0.15;
      group.add(vertical);

      const leftArm = vertical.clone();
      leftArm.position.x = -0.72;
      leftArm.position.y = -0.25;
      leftArm.rotation.z = 0.18;
      group.add(leftArm);

      const rightArm = vertical.clone();
      rightArm.position.x = 0.72;
      rightArm.position.y = -0.25;
      rightArm.rotation.z = -0.18;
      group.add(rightArm);

      const curve = new THREE.Mesh(
        new THREE.TorusGeometry(0.74, 0.17, 18, 80, Math.PI),
        new THREE.MeshStandardMaterial({ color: 0xf6f8fb, emissive: 0x123b45, roughness: 0.28, metalness: 0.35 }),
      );
      curve.position.y = -1.42;
      curve.rotation.z = Math.PI;
      group.add(curve);

      const light = new THREE.PointLight(0x86ffb6, 16, 18);
      light.position.set(2.5, 2.5, 4);
      scene.add(light);
      scene.add(new THREE.AmbientLight(0xffffff, 0.8));

      let frame = 0;
      const animate = () => {
        frame = requestAnimationFrame(animate);
        group.rotation.y += 0.004;
        group.rotation.x = Math.sin(performance.now() * 0.0008) * 0.08;
        torus.rotation.z += 0.006;
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
      <div className="three-scene" ref={mountRef} />
      <div className="hero-grid" />
      <div className="orbital-ring ring-one" />
      <div className="orbital-ring ring-two" />
    </div>
  );
}
