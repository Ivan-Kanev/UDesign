import { useEffect } from "react";

export function useMotionSystem() {
  useEffect(() => {
    let disposed = false;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
      return undefined;
    }

    const cleanups: Array<() => void> = [];

    void Promise.all([import("gsap"), import("gsap/ScrollTrigger"), import("lenis")]).then(([gsapModule, scrollModule, lenisModule]) => {
      if (disposed) return;

      const gsap = gsapModule.default;
      const ScrollTrigger = scrollModule.ScrollTrigger;
      const Lenis = lenisModule.default;

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.08,
        smoothWheel: true,
        wheelMultiplier: 0.82,
      });

      lenis.on("scroll", ScrollTrigger.update);
      const ticker = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);
      cleanups.push(() => {
        gsap.ticker.remove(ticker);
        lenis.destroy();
      });

      const revealElements = gsap.utils.toArray<HTMLElement>(".reveal");
      revealElements.forEach((element, index) => {
        gsap.fromTo(
          element,
          { y: 34, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.88,
            delay: Math.min(index % 3, 2) * 0.04,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 84%",
              once: true,
            },
          },
        );
      });

      gsap.to(".stage-mark", {
        rotateX: 8,
        rotateY: -12,
        y: -18,
        ease: "none",
        scrollTrigger: {
          trigger: ".identity-stage",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      const onPointerMove = (event: PointerEvent) => {
        document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
        document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
      };

      window.addEventListener("pointermove", onPointerMove);
      cleanups.push(() => window.removeEventListener("pointermove", onPointerMove));

      const magneticElements = Array.from(document.querySelectorAll<HTMLElement>(".magnetic"));
      magneticElements.forEach((element) => {
        const onMove = (event: PointerEvent) => {
          const rect = element.getBoundingClientRect();
          const x = (event.clientX - rect.left - rect.width / 2) * 0.08;
          const y = (event.clientY - rect.top - rect.height / 2) * 0.1;
          element.style.transform = `translate(${x}px, ${y}px)`;
        };
        const onLeave = () => {
          element.style.transform = "";
        };
        element.addEventListener("pointermove", onMove);
        element.addEventListener("pointerleave", onLeave);
        cleanups.push(() => {
          element.removeEventListener("pointermove", onMove);
          element.removeEventListener("pointerleave", onLeave);
        });
      });

      ScrollTrigger.refresh();
      cleanups.push(() => ScrollTrigger.getAll().forEach((trigger) => trigger.kill()));
    });

    return () => {
      disposed = true;
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);
}
