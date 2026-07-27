const root = document.documentElement;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll("[data-reveal]").forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
  revealObserver.observe(element);
});

if (!prefersReducedMotion) {
  window.addEventListener("pointermove", (event) => {
    root.style.setProperty("--cursor-x", `${event.clientX}px`);
    root.style.setProperty("--cursor-y", `${event.clientY}px`);
  });

  document.querySelectorAll(".magnetic").forEach((element) => {
    element.addEventListener("pointermove", (event) => {
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) * 0.14;
      const y = (event.clientY - rect.top - rect.height / 2) * 0.18;
      element.style.transform = `translate(${x}px, ${y}px)`;
    });

    element.addEventListener("pointerleave", () => {
      element.style.transform = "";
    });
  });
}

const canvas = document.getElementById("signal-canvas");
const context = canvas?.getContext("2d");

if (canvas && context && !prefersReducedMotion) {
  const particles = Array.from({ length: 58 }, () => ({
    x: Math.random(),
    y: Math.random(),
    depth: 0.35 + Math.random() * 0.9,
    phase: Math.random() * Math.PI * 2
  }));

  const resize = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(canvas.offsetWidth * ratio);
    canvas.height = Math.floor(canvas.offsetHeight * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  };

  const draw = (time) => {
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    context.clearRect(0, 0, width, height);

    particles.forEach((particle, index) => {
      const drift = Math.sin(time * 0.00045 + particle.phase) * 28 * particle.depth;
      const x = particle.x * width + drift;
      const y = particle.y * height + Math.cos(time * 0.00032 + particle.phase) * 18;
      const radius = 1.2 + particle.depth * 1.8;

      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fillStyle = index % 3 === 0 ? "rgba(134,255,182,.5)" : "rgba(102,233,255,.42)";
      context.fill();
    });

    for (let i = 0; i < particles.length - 1; i += 1) {
      const a = particles[i];
      const b = particles[i + 1];
      context.beginPath();
      context.moveTo(a.x * width, a.y * height);
      context.lineTo(b.x * width, b.y * height);
      context.strokeStyle = "rgba(255,255,255,.045)";
      context.stroke();
    }

    requestAnimationFrame(draw);
  };

  resize();
  window.addEventListener("resize", resize);
  requestAnimationFrame(draw);
}
