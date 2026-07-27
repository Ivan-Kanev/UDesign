# UDesign Website Development Prompt

## Technology Stack and Selection Principles

Use a modern, production-ready technology stack capable of delivering the premium, highly interactive, cinematic web experience described in this brief. Evaluate every technology critically and use only the tools that genuinely improve the final result. Do not add libraries simply because they are popular, and do not introduce unnecessary complexity. Select the smallest, strongest, and most maintainable combination of technologies required to achieve the intended design, performance, animation quality, responsiveness, and GitHub Pages compatibility.

The preferred foundation for the project is React, TypeScript, and Vite. Use React to create a clean component-based architecture, TypeScript to ensure type safety and long-term maintainability, and Vite to provide a fast development environment, optimized production builds, and reliable deployment to GitHub Pages.

Use GSAP as the primary animation engine, together with GSAP ScrollTrigger, for advanced scroll-driven interactions and cinematic storytelling. Use Lenis when it provides a meaningful improvement to the scrolling experience. Use Three.js only where real-time 3D or GPU-accelerated graphics create genuine visual value. Use Motion for React only for component-level interactions where it is simpler and cleaner than GSAP.

Use Tailwind CSS together with carefully written custom CSS only when Tailwind materially improves layout, spacing, responsive behavior, typography, and token consistency. Custom CSS should carry the distinctive UDesign visual identity, advanced masks, gradients, perspective effects, custom cursors, glass effects, animated backgrounds, and other brand-specific styling.

Use SVG as the preferred format for logos, icons, diagrams, and scalable brand graphics. Use a consistent lightweight icon system such as Lucide React unless a custom icon family is created specifically for UDesign.

Use optimized local or properly licensed variable fonts when appropriate. Use ESLint and Prettier or equivalent tools to enforce consistent code quality and formatting. Maintain a clear project structure with reusable components, separated animation logic, centralized design tokens, clean utilities, and well-organized assets.

Configure the project for GitHub Pages deployment from the beginning. Use GitHub Actions when appropriate. Ensure Vite base paths, asset URLs, routing behavior, and build output are compatible with both repository-based GitHub Pages URLs and a future custom domain.

Selection principles:

- Prefer native HTML and CSS for simple functionality.
- Prefer CSS transitions for lightweight hover and focus effects.
- Use GSAP for sophisticated animation sequences and scroll storytelling.
- Use Motion for React for simple component-state and layout transitions.
- Use Three.js only for high-value 3D or shader-driven experiences.
- Avoid duplicating the same functionality across several libraries.
- Avoid large dependencies for small visual effects.
- Lazy-load heavy animation and 3D modules.
- Code-split expensive sections.
- Pause off-screen animations.
- Reduce visual complexity on weaker mobile devices.
- Provide graceful fallbacks when advanced graphics cannot run.
- Respect the user’s `prefers-reduced-motion` setting.
- Preserve smooth interaction and approximately 60 FPS wherever realistically possible.
- Keep the website functional even when decorative animation is reduced or disabled.

## Current UDesign Decision

This project uses React, TypeScript, Vite, custom CSS, GSAP ScrollTrigger, Lenis, Three.js, GitHub Actions, and GitHub Pages. Tailwind CSS, Motion for React, and Lucide React are intentionally skipped for the current implementation because they do not yet provide enough additional value for the existing interface.
